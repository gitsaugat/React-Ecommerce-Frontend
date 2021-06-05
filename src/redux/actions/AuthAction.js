import { action_type } from "../constants/auth";

const login = (user_data) => {
  return {
    type: action_type.LOGIN_USER,
    payload: user_data,
  };
};

export { login };
