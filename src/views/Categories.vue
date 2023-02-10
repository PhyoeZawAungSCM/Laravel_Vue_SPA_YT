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
            v-for="category in get_c"
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
                @click="comfirmationMode(category)"
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center" v-show="$store.state.category.hasMore_c">
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="$store.dispatch('LoadMoreData_c')"
        >
          <i class="fa fa-arrow-down me-1"></i>Load More
        </button>
      </div>
    </div>
    <modal name="Category" :type="mode" :isEditMode="isEdit" ref="modal">
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal,
  },
  name: "Categories",
  data() {
    return {
      isEdit: false,
      mode: "",
    };
  },
  methods: {
    openModal() {
      this.$refs.modal.openModal();
    },
    createMode() {
      this.isEdit = false;
      this.mode = "category";
      this.openModal();
    },
    editMode(category) {
      this.isEdit = true;
      this.mode = "category";
      this.$refs.modal.Data = {
        name: category.name,
        id: category.id,
        image: category.image,
      };
      this.$refs.modal.previewImage = `${this.$store.state.BaseURL}/storage/${category.image}`;
      this.openModal();
    },
    comfirmationMode(category) {
      this.mode = "confirm";
      this.$refs.modal.Data = category;
      this.openModal();
    },
  },
  computed: {
    get_c() {
      return this.$store.getters.getCategories;
    },
  },

  mounted() {
    this.$store.dispatch("getCategories");
  },
};
</script>

<style>
</style>