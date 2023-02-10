<template>
  <div>
    <b-modal
      ref="modal"
      hide-footer
      :title="setTitle"
      :hide-header-close="true"
      :cancel-disabled="true"
    >
      <div v-if="type == 'category' || type == 'product'">
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="isEditMode ? update() : save()">
            <div class="mb-3" v-if="type == 'product'">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <div class="col">
                  <select
                    v-model="Data.c_id"
                    class="form-select"
                    aria-label="Default select example"
                    name="Category"
                  >
                    <option disabled value="">Please select category</option>
                    <option
                      v-for="category in get_c_name"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="mb-3">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <div class="col">
                  <input
                    type="text"
                    name="Name"
                    class="form-control"
                    :placeholder="'Enter ' + name + ' name'"
                    v-model="Data.name"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="mb-3">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|image"
                ref="provider"
              >
                <input
                  class="form-control"
                  type="file"
                  :name="type"
                  @change="attachFile"
                  ref="ImageFile"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div v-if="previewImage" class="d-block my-3 border">
              <img
                :src="previewImage"
                alt="..."
                style="width: 180px"
                class="d-block mx-auto p-3"
              />
            </div>
            <div class="d-block"></div>
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-danger mx-3"
                type="button"
                @click="closeModal"
              >
                Cancel
              </button>
              <button class="btn btn-primary" type="submit" :disabled="invalid">
                <i class="fa fa-check"></i>
                {{ isEditMode ? "Update" : "Save" }}
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <div v-else>
        <h6>Are you sure you want to delete</h6>
        <hr />
        <div class="d-flex justify-content-end">
          <button class="btn btn-danger mx-3" type="button" @click="closeModal">
            Cancel
          </button>
          <button class="btn btn-primary" @click="Confirm">Ok</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    name: String,
    type: String,
    isEditMode: Boolean,
    category: Object,
    product: Object,
  },
  data() {
    return {
      previewImage: undefined,
      Data: {
        name: "",
        c_id: null,
        image: null,
      },
    };
  },
  methods: {
    openModal() {
      this.$refs["modal"].show();
    },
    closeModal() {
      this.$refs["modal"].hide();
      this.clearData();
    },

    // to clear data after close
    clearData() {
      this.Data = {
        name: "",
        c_id: "",
        image: null,
      };
      this.previewImage = undefined;
    },

    // file attach in image upload
    async attachFile(e) {
      const { valid } = await this.$refs.provider.validate(e);
      if (valid) {
        this.Data.image = this.$refs.ImageFile.files.item(0);
        this.previewImage = URL.createObjectURL(this.Data.image);
      }
    },
    // updating the fields
    update() {
      // if the type is product , call the eidtProduct action
      if (this.type == "product") {
        this.$store.dispatch("editProduct", this.Data);
      }
      // call editCategory action
      else if (this.type == "category") {
        this.$store.dispatch("editCategory", this.Data);
      }
      // if the type not found
      else {
        console.log("Unknown type");
      }
      this.closeModal();
    },
    // saving the field to server
    save() {
      // if the type is product, call the saveProduct action
      if (this.type == "product") {
        this.$store.dispatch("saveProduct", this.Data);
      }
      // call saveCategory action
      else if (this.type == "category") {
        this.$store.dispatch("saveCategory", this.Data);
      }
      // if the type not found
      else {
        console.log("Unknown type");
      }
      this.closeModal();
    },
    // loading all the categories name to show in select box
    loadCategoriesName() {
      if (this.type == "product") {
        this.$store.dispatch("getCategoriesNames");
      }
    },
    Confirm() {
      if (this.Data.c_id == null) {
        this.$store.dispatch("deleteCategory", this.Data);
      } else {
        this.$store.dispatch("deleteProduct", this.Data);
      }
      this.closeModal();
    },
  },
  computed: {
    // if the category is added and load its again
    get_c_name() {
      return this.$store.getters.getCategoriesNames;
    },
    setTitle() {
      if (this.type == "confirm") {
        return "Delete " + this.name;
      }
      if (this.isEditMode) {
        return "Edit " + this.name;
      }
      return "Create " + this.name;
    },
  },
  mounted() {
    // call the  function to load the categories names
    this.loadCategoriesName();
  },
};
</script>
<style>
</style>