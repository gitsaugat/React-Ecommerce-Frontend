import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Nav = () => {
  const state = useSelector((state) => state.login_reducer);
  const { x_f_token, isLoggedIn } = state;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        Ecom
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Products
            </Link>
          </li>
        </ul>
        {isLoggedIn && (
          <form className="form-inline my-2 my-lg-0">
            <Link
              to="/profile"
              className="btn btn-outline-success my-2 my-sm-0"
            >
              🛒
            </Link>
            &nbsp;
            <Link
              to="/logout"
              className="btn"
              style={{
                color: "white",
              }}
            >
              Logout
            </Link>
          </form>
        )}
        {!isLoggedIn && (
          <form className="form-inline my-2 my-lg-0">
            <Link to="/login" className="btn btn-success my-2 my-sm-0">
              Login
            </Link>
            &nbsp;
            <Link
              to="/register"
              className="btn btn-outline-danger"
              style={{
                color: "white",
              }}
            >
              Register
            </Link>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Nav;
