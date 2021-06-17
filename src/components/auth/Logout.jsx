import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/AuthAction";
import { useHistory } from "react-router-dom";
export const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    dispatch(
      login({
        token: "",
        isloggedin: "",
      })
    );
    history.push("/login");
  }, []);

  return <div></div>;
};
