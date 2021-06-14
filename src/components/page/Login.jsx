import React, { useState } from "react";
import { BASE_URL } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/actions/AuthAction";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const state = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  const [userdata, setUserData] = useState({
    username: "",
    password: "",
  });
  const signInHandler = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/api/v1/user/token/`;
    const request = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: userdata.username,
        password: userdata.password,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    const response = await request.json();
    try {
      if (response.token) {
        localStorage.setItem("x_token", response.token);
        localStorage.setItem("logged_in", true);
        dispatch(login({ token: response.token, isloggedin: true }));
        setError(null);
        history.push("/");
      } else {
        localStorage.clear();
        setError("Opps ! wrong username or password");
      }
    } catch {
      console.log("error");
      setError("Opps ! something went wrong");
    }
  };
  return (
    <div className="container" style={{ padding: "50px", marginTop: "10%" }}>
      <h3 className>Login</h3>
      <form onSubmit={signInHandler}>
        <div>
          <label>Username</label>
          <br />
          <input
            value={userdata.username}
            onChange={(e) =>
              setUserData({ ...userdata, username: e.target.value })
            }
            className="form-control"
            type="text"
            placeholder="johndoe"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            value={userdata.password}
            onChange={(e) =>
              setUserData({ ...userdata, password: e.target.value })
            }
            className="form-control"
            type="password"
            placeholder="*******"
            required
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          {"Sign In"}
        </button>
      </form>
      <br />
      {error !== null && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Login;
