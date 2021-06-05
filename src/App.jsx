import Nav from "./components/page/Nav";
import React, { useEffect } from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Products from "./components/ecom/Products";
import ProductView from "./components/ecom/ProductView";
import Login from "./components/page/Login";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./redux/actions/AuthAction";
import Profile from "./components/user/Profile";
import { Logout } from "./components/auth/Logout";
import Payment from "./components/user/Payment";

function App() {
  const state = useSelector((state) => state);
  const { isLoggedIn } = state.login_reducer;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      login({
        token: localStorage.getItem("x_token"),
        isloggedin: localStorage.getItem("logged_in"),
      })
    );
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Route
        exact
        path="/"
        render={(props) => {
          if (isLoggedIn) {
            return <Products />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
        }}
      />
      <Route
        exact
        path="/product/:id"
        render={(props) => {
          if (isLoggedIn) {
            return <ProductView />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
        }}
      />

      <Route
        exact
        path="/login"
        render={(props) => {
          if (!localStorage.getItem("logged_in")) {
            return <Login />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/", state: { from: props.location } }}
              />
            );
          }
        }}
      />
      <Route
        exact
        path="/profile"
        render={(props) => {
          if (localStorage.getItem("logged_in")) {
            return <Profile />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
        }}
      />

      <Route
        exact
        path="/logout"
        exact
        render={(props) => {
          if (isLoggedIn) {
            return <Logout />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
        }}
      />
      <Route
        exact
        path="/payment/stripe"
        exact
        render={(props) => {
          if (localStorage.getItem("logged_in")) {
            return <Payment />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
        }}
      />
    </BrowserRouter>
  );
}

export default App;
