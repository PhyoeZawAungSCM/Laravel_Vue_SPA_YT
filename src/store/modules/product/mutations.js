export const GET_PRODUCTS = (state, payload) => {
    state.products = payload;
}
export const LOAD_MORE_P = (state, payload) => {
    console.log("Load more product:", payload);
    state.products = [...state.products, ...payload];
}
export const GET_CATEGORIES_NAMES = (state, payload) => {
    state.categoriesName = payload;
}
export const EDIT_PRODUCT = (state, payload) => {
    let product = state.products.find((data) => {
        return data.id == payload.id;
    });
    product.name = payload.name;
    product.image = payload.image;
    product.category_id = payload.category_id;
}