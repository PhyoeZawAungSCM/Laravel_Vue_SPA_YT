<template>
  <div class="card m-4">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <i class="fas fa-table me-1"></i>
          <span>Categories</span>
        </div>

        <button class="btn btn-primary" @click="createMode">
          <i class="fa fa-plus"></i>
          Create
        </button>
      </div>
    </div>
    <div class="card-body">
      <table id="datatablesSimple" class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in categories"
            :key="category.id"
            class="justify-content-center"
          >
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>
              <img
                :src="`${$store.state.BaseURL}/storage/${category.image}`"
                :alt="category.image"
                style="display: block; width: 100px"
              />
            </td>
            <td>
              <button class="btn btn-primary mx-1" @click="editMode(category)">
                <i class="fa fa-edit"></i>
              </button>
              <button
                class="btn btn-danger mx-1"
                @click="deleteCategory(category)"
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center" v-show="hasMore">
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="LoadMoreData"
        >
          <i class="fa fa-arrow-down me-1"></i>Load More
        </button>
      </div>
    </div>
    <b-modal
      ref="category"
      hide-footer
      title="Add New Category"
      :hide-header-close="true"
      :cancel-disabled="true"
    >
      <div class="d-block">
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="isEdit ? editCategory() : Save()">
            <div class="mb-3">
              <div class="col">
                <ValidationProvider
                  name="Name"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    type="text"
                    name="Name"
                    class="form-control"
                    placeholder="Enter Category name"
                    v-model="categoryData.name"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </ValidationProvider>
                <span v-if="errors.name" class="text-danger fs-6">{{
                  errors.name
                }}</span>
              </div>
            </div>

            <div class="mb-3">
              <ValidationProvider
                name="image"
                rules="required|image"
                v-slot="{ errors }"
                ref="provider"
              >
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  @change="attachFile"
                  ref="ImageFile"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
              <span v-if="errors.image" class="text-danger fs-6">{{
                errors.image
              }}</span>
            </div>

            <div v-if="previewImage" class="d-block my-3 border">
              <img
                :src="previewImage"
                alt="..."
                style="width: 180px"
                class="d-block mx-auto p-3"
              />
            </div>
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
                {{ isEdit ? "Update" : "Save" }}
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { httpFile, http } from "@/services/http_services";
import { ref } from "vue";
export default {
  name: "Categories",
  data() {
    return {
      previewImage: undefined,
      isEdit: false,
      categories: [],
      categoryData: {
        id: null,
        name: "",
        image: undefined,
      },
      errors: {
        name: null,
        image: null,
      },
      hasMore: true,
      nextPage: 1,
    };
  },
  methods: {
    openModal() {
      this.clearErrors();
      this.$refs["category"].show();
    },
    closeModal() {
      this.clearErrors();
      this.categoryData = {
        name: "",
        image: undefined,
      };
      this.previewImage = undefined;
      this.$refs["category"].hide();
    },
    createMode() {
      this.isEdit = false;
      this.openModal();
    },
    Save() {
      let formData = new FormData();
      formData.append("name", this.categoryData.name);
      formData.append("image", this.categoryData.image);
      httpFile()
        .post("/category", formData)
        .then((res) => {
          this.categories.unshift(res.data);
          this.flashMessage.success({
            message: "Category Created Successfully",
          });
          this.closeModal();
          this.clearErrors();
        })
        .catch((error) => {
          console.log(error.response);
          this.flashMessage.error({
            message: "Category Create Failed",
          });
          this.clearErrors();

          if (error.response.data.errors.name) {
            this.errors.name = error.response.data.errors.name[0];
          }
          if (error.response.data.errors.image) {
            this.errors.image = error.response.data.errors.image[0];
          }
        });
    },
    async attachFile(e) {
      const { valid } = await this.$refs.provider.validate(e);
      if (valid) {
        this.categoryData.image = this.$refs.ImageFile.files.item(0);
        this.previewImage = URL.createObjectURL(this.categoryData.image);
      }
    },
    clearErrors() {
      this.errors.image = this.errors.name = null;
    },
    getCategories() {
      http()
        .get("/category")
        .then((response) => {
          this.categories = response.data.data;
          if (response.data.current_page == response.data.last_page) {
            this.hasMore = false;
          } else {
            this.nextPage += 1;
          }
        })
        .catch((error) => {
          this.flashMessage.error({
            message: "Some error occur in fetching data",
          });
        });
    },
    deleteCategory(category) {
      console.log("delete");
      if (!confirm("Are you sure you want to delete", category.name)) {
        return;
      }
      http()
        .delete(`/category/${category.id}`)
        .then((response) => {
          this.categories = this.categories.filter(
            (data) => data.id != category.id
          );
          this.flashMessage.success({
            message: "Category Deleted Successfully",
          });
        })
        .catch((error) => {});
    },
    editMode(category) {
      this.isEdit = true;
      this.categoryData.name = category.name;
      this.categoryData.id = category.id;
      this.categoryData.image = category.image;
      this.previewImage = `${this.$store.state.BaseURL}/storage/${category.image}`;
      this.openModal();
    },
    editCategory() {
      let formData = new FormData();
      formData.append("name", this.categoryData.name);
      formData.append("image", this.categoryData.image);
      formData.append("_method", "put");

      httpFile()
        .post(`/category/${this.categoryData.id}`, formData)
        .then((res) => {
          this.closeModal();
          console.log(res.data);
          let cat = this.categories.find((data) => {
            return data.id == res.data.id;
          });
          console.log("found:", cat);

          cat.name = res.data.name;
          cat.image = res.data.image;

          this.flashMessage.success({
            message: "Category Update Successfully",
          });

          this.clearErrors();
        })
        .catch((error) => {
          this.flashMessage.error({
            message: "Category Update Failed",
          });
          this.clearErrors();

          if (error.response.data.errors.name) {
            this.errors.name = error.response.data.errors.name[0];
          }
          if (error.response.data.errors.image) {
            this.errors.image = error.response.data.errors.image[0];
          }
        });
    },
    LoadMoreData() {
      http()
        .get(`category?page=${this.nextPage}`)
        .then((response) => {
          if (response.data.current_page == response.data.last_page) {
            this.hasMore = false;
          } else {
            console.log("They are note same");
            this.nextPage += 1;
          }

          this.categories = [...this.categories, ...response.data.data];
        })
        .catch((error) => {
          this.flashMessage.error({
            message: "Some error occur in fetching data",
          });
        });
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style>
</style>