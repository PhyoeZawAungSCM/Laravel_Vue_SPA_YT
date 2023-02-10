
import * as actions from './actions';
import * as mutations from './mutations';
export default {
  state: {
    categories: [],
    errors_c: {},
    hasMore_c: true,
    nextPage_c: 1,
  },
  actions,
  mutations,
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getErrors_c(state) {
      return state.errors_c;
    }
  },
}