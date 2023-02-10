<template>
  <div class="card m-4">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <i class="fas fa-table me-1"></i>
          <span>Product</span>
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
            <th>Category Name</th>
            <th>Name</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in get_p"
            :key="product.id"
            class="justify-content-center"
          >
            <td>{{ product.id }}</td>
            <td>{{ getCategoryName(product.category_id) }}</td>
            <td>{{ product.name }}</td>

            <td>
              <img
                :src="`${$store.state.BaseURL}/storage/${product.image}`"
                :alt="product.image"
                style="display: block; width: 100px"
              />
            </td>
            <td>
              <button class="btn btn-primary mx-1" @click="editMode(product)">
                <i class="fa fa-edit"></i>
              </button>
              <button
                class="btn btn-danger mx-1"
                @click="comfirmationMode(product)"
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-center" v-if="$store.state.product.hasMore_p">
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="$store.dispatch('LoadMoreData_p')"
        >
          <i class="fa fa-arrow-down me-1"></i>Load More
        </button>
      </div>
    </div>
    <modal name="Product" :type="mode" :isEditMode="isEdit" ref="modal">
    </modal>
  </div>
</template>
  
  <script>
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal,
  },
  name: "Products",
  data() {
    return {
      isEdit: false,
      categories: [],
      mode: "",
    };
  },
  methods: {
    // to load category name to respective product
    getCategoryName(id) {
      let data = this.get_c();
      data = data.find((data) => data.id == id);
      return data ? data.name : null;
    },

    openModal() {
      this.$refs.modal.openModal();
    },

    // open model as creating mode
    createMode() {
      this.isEdit = false;
      this.mode = "product";
      this.openModal();
    },

    // open model as editing mode and also pass data to it
    editMode(product) {
      this.isEdit = true;
      this.mode = "product";
      console.log(product);
      this.$refs.modal.Data = {
        name: product.name,
        id: product.id,
        image: product.image,
        c_id: product.category_id,
      };
      this.$refs.modal.previewImage = `${this.$store.state.BaseURL}/storage/${product.image}`;
      this.$refs.modal.openModal();
    },
    comfirmationMode(product) {
      this.mode = "confirm";
      this.$refs.modal.Data = {
        name: product.name,
        id: product.id,
        image: product.image,
        c_id: product.category_id,
      };
      this.openModal();
    },

    // getting the categories
    get_c() {
      return this.$store.getters.getCategoriesNames;
    },
  },
  mounted() {
    // getting all the products from server
    this.$store.dispatch("getProducts");
    // gettinng all the categories form server
    this.$store.dispatch("getCategoriesNames");
  },
  computed: {
    // if the product change in store need to load and do not change no need to load store in cache
    get_p() {
      return this.$store.getters.getProducts;
    },
  },
};
</script>
  
  <style>
</style>