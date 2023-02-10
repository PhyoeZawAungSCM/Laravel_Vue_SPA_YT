export const GET_CATEGORIES = (state, payload) => {
  state.categories = payload;
}
export const LOAD_MORE_C = (state, payload) => {
  state.categories = [...state.categories, ...payload];
}
export const EDIT_CATEGORY = (state, payload) => {
  let category = state.categories.find((data) => {
    return data.id == payload.id;
  });
  category.name = payload.name;
  category.image = payload.image;
}