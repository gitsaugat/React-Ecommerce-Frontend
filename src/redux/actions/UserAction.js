import { user_actions } from "../constants/user";

const get_cart_items = (cart_items) => {
  return {
    type: user_actions.GET_CART_DATA,
    payload: cart_items,
  };
};

const remove_item_form_cart = (item_data) => {
  return {
    type: user_actions.REMOVE_ITEM_FROM_CART,
    payload: item_data,
  };
};

const add_item_to_cart = (item) => {
  return {
    type: user_actions.ADD_ITEN_TO_CART,
    payload: item,
  };
};

export { get_cart_items, remove_item_form_cart, add_item_to_cart };
