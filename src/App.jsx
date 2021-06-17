import Nav from "./components/page/Nav";
import React, { useEffect } from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Products from "./components/ecom/Products";
import ProductView from "./components/ecom/ProductView";
import Login from "./components/page/Login";
import { useDispatch } from "react-redux";
import { login } from "./redux/actions/AuthAction";
import Profile from "./components/user/Profile";
import { Logout } from "./components/auth/Logout";
import Payment from "./components/user/Payment";
import CategoryProducts from "./components/ecom/CategoryProducts";
import Register from "./components/auth/Register";
function App() {
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
          if (localStorage.getItem("logged_in")) {
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
        path="/products"
        render={(props) => {
          if (localStorage.getItem("logged_in")) {
            return <CategoryProducts />;
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
          if (localStorage.getItem("logged_in")) {
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
        path="/register"
        render={(props) => {
          if (!localStorage.getItem("logged_in")) {
            return <Register />;
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
        path="/logout"
        exact
        render={(props) => {
          if (localStorage.getItem("logged_in")) {
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
