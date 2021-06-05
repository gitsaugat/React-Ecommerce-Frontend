import { combineReducers } from "redux";
import { ProductReducer } from "./ProductReducer";
import { Login_Reducer, Logout_Reducer } from "./AuthReducer";
import { cart_reducer } from "./UserReducer";
const reducers = combineReducers({
  all_products: ProductReducer,
  login_reducer: Login_Reducer,
  logout_reducer: Logout_Reducer,
  cart_items: cart_reducer,
});

export { reducers };
