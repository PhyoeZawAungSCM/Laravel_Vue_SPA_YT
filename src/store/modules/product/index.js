import * as actions from './actions';
import * as mutations from './mutations';
export default {
  state: {
    products: [],
    categoriesName: [],
    errors_p: {},
    hasMore_p: true,
    nextPage_p: 1,
  },
  actions,
  mutations,
  getters: {
    getProducts(state) {
      return state.products;
    },
    getErrors_p(state) {
      return state.errors;
    },
    getCategoriesNames(state) {
      return state.categoriesName;
    }
  },
}