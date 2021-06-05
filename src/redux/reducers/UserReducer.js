import { user_actions } from "../constants/user";

const initialState = {
  cart_items: [],
};

const cart_reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case user_actions.GET_CART_DATA:
      return { ...state, cart_items: payload };
    default:
      return state;
  }
};

export { cart_reducer };
