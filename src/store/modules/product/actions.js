import { http, httpFile } from "@/services/http_services";
import { vm } from "@/main";
export const getProducts = ({ state, commit }) => {
    http()
        .get("/products")
        .then((response) => {
            if (response.data.current_page == response.data.last_page) {
                state.hasMore_p = false;
            } else {
                state.nextPage_p += 1;
            }
            commit('GET_PRODUCTS', response.data.data)
        })
        .catch((error) => {
            vm.flashMessage.error({
                message: "Some error occur in fetching data",
            });
        });
}
export const LoadMoreData_p = ({ state, commit }) => {
    http()
        .get(`products?page=${state.nextPage_p}`)
        .then((response) => {
            if (response.data.current_page == response.data.last_page) {
                state.hasMore_p = false;
            } else {
                state.nextPage_p += 1;
            }
            commit("LOAD_MORE_P", response.data.data);
        })
        .catch((error) => {
            vm.flashMessage.error({
                message: "Some error occur in fetching data",
            });
        });
}
export const saveProduct = ({ state }, product) => {
    console.log('saveProduct');
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("image", product.image);
    formData.append("category_id", product.c_id);
    httpFile()
        .post("/products", formData)
        .then((res) => {
            state.products.unshift(res.data);
            vm.flashMessage.success({
                message: "Category Created Successfully",
            });
        })
        .catch((error) => {
            vm.flashMessage.error({
                message: "Category Create Failed",
            });
            if (error.response.data.errors.name) {
                state.errors_p.name = error.response.data.errors.name[0];
            }
            if (error.response.data.errors.image) {
                state.errors_p.image = error.response.data.errors.image[0];
            }
            if (error.response.data.errors.category_id) {
                state.errors_p.category_id = error.response.data.errors.category_id[0];
            }
        });
}
export const editProduct = ({ state, commit }, product) => {
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("image", product.image);
    formData.append("category_id", product.c_id);
    formData.append("_method", "put");
    httpFile()
        .post(`/products/${product.id}`, formData)
        .then((res) => {
            vm.flashMessage.success({
                message: "product Update Successfully",
            });
            commit("EDIT_PRODUCT", res.data);


        })
        .catch((error) => {
            vm.flashMessage.error({
                message: "product Update Failed",
            });
            if (error.response.data.errors.name) {
                state.errors_p.name = error.response.data.errors.name[0];
            }
            if (error.response.data.errors.image) {
                state.errors_p.image = error.response.data.errors.image[0];
            }
        });
}
export const deleteProduct = ({ state }, product) => {
    http()
        .delete(`/products/${product.id}`)
        .then((response) => {
            state.products = state.products.filter(
                (data) => data.id != product.id
            );
            vm.flashMessage.success({
                message: "Product Deleted Successfully",
            });
        })
}
export const getCategoriesNames = ({ commit }) => {
    http()
        .get("/get-categories")
        .then((response) => {
            commit('GET_CATEGORIES_NAMES', response.data);
        })
        .catch((error) => {
            $vm.flashMessage.error({
                message: "Some error occur in fetching data",
            });
        });
}