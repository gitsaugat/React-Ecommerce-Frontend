import { action_type } from "../constants/products.js";
const setProducts = (products) => {
  return {
    type: action_type.SET_PRODUCTS,
    payload: products,
  };
};

const selectedProduct = (product) => {
  return {
    type: action_type.SELECTED_PRODUCT,
    payload: product,
  };
};

const randomProduct = (product) => {
  return {
    type: action_type.RANDOM_PRODUCT,
    payload: product,
  };
};

const categoryProducts = (products) => {
  return {
    type: action_type.CATEGORY_PRODUCTS,
    payload: products,
  };
};

export { setProducts, selectedProduct, randomProduct, categoryProducts };
