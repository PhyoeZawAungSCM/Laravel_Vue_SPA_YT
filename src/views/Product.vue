<template>
  <!-- <div>Hello</div> -->
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
            v-for="product in products"
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
                @click="deleteCategory(product)"
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
              <ValidationProvider v-slot="{ errors }" rules="required">
                <div class="col">
                  <select
                    v-model="productData.category_id"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option disabled value="">Please select category</option>
                    <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <span class="invalid-feedback">{{ errors[0] }}</span>
                <span v-if="errors.name" class="text-danger fs-6">{{
                  errors.category_id
                }}</span>
              </ValidationProvider>
            </div>
            <div class="mb-3">
              <div class="col">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <input
                    type="text"
                    name="Name"
                    class="form-control"
                    placeholder="Enter Category name"
                    v-model="productData.name"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                  <span v-if="errors.name" class="text-danger fs-6">{{
                    errors.name
                  }}</span>
                </ValidationProvider>
              </div>
            </div>

            <div class="mb-3">
              <ValidationProvider
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
                <span v-if="errors.image" class="text-danger fs-6">{{
                  errors.image
                }}</span>
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
import { ValidationProvider } from "vee-validate";
export default {
  name: "Products",
  data() {
    return {
      previewImage: undefined,
      isEdit: false,
      categories: [],
      products: [],
      productData: {
        id: null,
        name: "",
        category_id: "",
        image: undefined,
      },
      errors: {
        name: null,
        image: null,
        category_id: null,
      },
      hasMore: true,
      nextPage: 1,
    };
  },
  methods: {
    getCategoryName(id) {
      let data = this.categories.find((data) => data.id == id);
      return data ? data.name : id;
    },
    openModal() {
      this.clearErrors();
      this.$refs["category"].show();
    },
    closeModal() {
      this.clearErrors();
      this.productData = {
        id: null,
        name: "",
        category_id: "",
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
      formData.append("name", this.productData.name);
      formData.append("image", this.productData.image);
      formData.append("category_id", this.productData.category_id);
      httpFile()
        .post("/products", formData)
        .then((res) => {
          this.products.unshift(res.data);
          this.flashMessage.success({
            message: "Category Created Successfully",
          });
          this.closeModal();
          this.clearErrors();
        })
        .catch((error) => {
          console.log(error);
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
          if (error.response.data.errors.category_id) {
            this.errors.category_id = error.response.data.errors.category_id[0];
          }
        });
    },
    async attachFile(e) {
      const { valid } = await this.$refs.provider.validate(e);
      if (valid) {
        this.productData.image = this.$refs.ImageFile.files.item(0);
        this.previewImage = URL.createObjectURL(this.productData.image);
      }
    },
    clearErrors() {
      this.errors.image = this.errors.name = this.errors.category_id = null;
    },
    getCategories() {
      http()
        .get("/get-categories")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          this.flashMessage.error({
            message: "Some error occur in fetching data",
          });
        });
    },
    getProducts() {
      http()
        .get("/products")
        .then((response) => {
          this.products = response.data.data;
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
    deleteCategory(product) {
      console.log("delete");
      if (!confirm("Are you sure you want to delete", product.name)) {
        return;
      }
      http()
        .delete(`/products/${product.id}`)
        .then((response) => {
          this.products = this.products.filter((data) => data.id != product.id);
          this.flashMessage.success({
            message: "Product Deleted Successfully",
          });
        })
        .catch((error) => {});
    },
    editMode(product) {
      this.isEdit = true;
      console.log(product);
      this.productData.name = product.name;
      this.productData.id = product.id;
      this.productData.image = product.image;
      this.productData.category_id = product.category_id;
      this.previewImage = `${this.$store.state.BaseURL}/storage/${product.image}`;
      this.openModal();
    },
    editCategory() {
      let formData = new FormData();
      formData.append("name", this.productData.name);
      formData.append("image", this.productData.image);
      formData.append("category_id", this.productData.category_id);
      formData.append("_method", "put");
      console.log("this is ", formData);
      httpFile()
        .post(`/products/${this.productData.id}`, formData)
        .then((res) => {
          this.closeModal();
          console.log(res.data);
          let cat = this.products.find((data) => {
            return data.id == res.data.id;
          });
          console.log("found:", cat);
          cat.name = res.data.name;
          cat.image = res.data.image;
          cat.category_id = res.data.category_id;
          this.flashMessage.success({
            message: "product Update Successfully",
          });
          this.clearErrors();
        })
        .catch((error) => {
          this.flashMessage.error({
            message: "product Update Failed",
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
        .get(`products?page=${this.nextPage}`)
        .then((response) => {
          if (response.data.current_page == response.data.last_page) {
            this.hasMore = false;
          } else {
            console.log("They are note same");
            this.nextPage += 1;
          }
          this.products = [...this.products, ...response.data.data];
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
    this.getProducts();
  },
  components: { ValidationProvider },
};
</script>
  
  <style>
</style>