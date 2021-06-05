import { action_type } from "../constants/products";
const initialState = {
  products: [],
  product: {},
  random_product: {},
};

const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case action_type.SET_PRODUCTS:
      return { ...state, products: payload };
    case action_type.SELECTED_PRODUCT:
      return { ...state, product: payload };
    case action_type.RANDOM_PRODUCT:
      return { ...state, random_product: payload };
    default:
      return state;
  }
};
export { ProductReducer };
