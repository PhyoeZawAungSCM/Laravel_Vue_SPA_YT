import { http, httpFile } from "@/services/http_services";
import { vm } from "@/main";
export const getCategories = ({ state, commit }) => {
  http()
    .get("/category")
    .then((response) => {
      if (response.data.current_page == response.data.last_page) {
        state.hasMore_c = false;
      } else {
        state.nextPage_c += 1;
      }
      commit('GET_CATEGORIES', response.data.data)
    })
    .catch((error) => {
      this.flashMessage.error({
        message: "Some error occur in fetching data",
      });
    });
}
export const LoadMoreData_c = ({ state, commit }) => {
  http()
    .get(`category?page=${state.nextPage_c}`)
    .then((response) => {
      if (response.data.current_page == response.data.last_page) {
        state.hasMore_c = false;
      } else {
        state.nextPage_c += 1;
      }
      commit("LOAD_MORE_C", response.data.data);
    })
    .catch((error) => {
      vm.flashMessage.error({
        message: "Some error occur in fetching data",
      });
    });
}
export const saveCategory = ({ state }, category) => {
  let formData = new FormData();
  formData.append("name", category.name);
  formData.append("image", category.image);

  httpFile()
    .post("/category", formData)
    .then((res) => {
      state.categories.unshift(res.data);
      vm.flashMessage.success({
        message: "Category Created Successfully",
      });
    })
    .catch((error) => {
      vm.flashMessage.error({
        message: "Category Create Failed",
      });
      if (error.response.data.errors.name) {
        state.errors_c.name = error.response.data.errors.name[0];
      }
      if (error.response.data.errors.image) {
        state.errors_c.image = error.response.data.errors.image[0];
      }
    });
}
export const editCategory = ({ state, commit }, category) => {
  let formData = new FormData();
  formData.append("name", category.name);
  formData.append("image", category.image);
  formData.append("_method", "put");
  httpFile()
    .post(`/category/${category.id}`, formData)
    .then((res) => {
      vm.flashMessage.success({
        message: "category Update Successfully",
      });
      console.log(res.data);
      commit("EDIT_CATEGORY", res.data);

    })
    .catch((error) => {
      vm.flashMessage.error({
        message: "product Update Failed",
      });
      console.log(error);
      if (error.response.data.errors.name) {
        state.errors_c.name = error.response.data.errors.name[0];
      }
      if (error.response.data.errors.image) {
        state.errors_c.image = error.response.data.errors.image[0];
      }
    });
}
export const deleteCategory = ({ state }, category) => {
  http()
    .delete(`/category/${category.id}`)
    .then((response) => {
      state.categories = state.categories.filter(
        (data) => data.id != category.id
      );
      vm.flashMessage.success({
        message: "Category Deleted Successfully",
      });
    })
}
