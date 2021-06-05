import { action_type } from "../constants/auth";

const initialState = {
  isLoggedIn: false,
  x_f_token: "",
};

const Login_Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case action_type.LOGIN_USER:
      return {
        ...state,
        x_f_token: payload.token,
        isLoggedIn: payload.isloggedin,
      };
    default:
      return state;
  }
};
const Logout_Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case action_type.LOGOUT_USER:
      return {
        ...state,
        x_f_token: "",
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export { Login_Reducer, Logout_Reducer };
