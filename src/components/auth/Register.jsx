import React, { useState } from "react";
import { BASE_URL } from "../../utils";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [userData, setuserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    email_error: null,
    username_error: null,
    password_error: null,
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/v1/register/user/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const json_response = await response.json();
    if (response.status === 200) {
      alert("account created successfully");
      setErrors({
        email_error: null,
        username_error: null,
        password_error: null,
      });
      history.push("/");
    } else {
      if (json_response.email) {
        setErrors({
          username_error: null,
          password_error: null,
          email_error: json_response.email[0],
        });
      }
      if (json_response.username) {
        setErrors({
          email_error: null,
          password_error: null,
          username_error: json_response.username[0],
        });
      }
      if (json_response.password) {
        setErrors({
          username_error: null,
          email_error: null,
          password_error: json_response.password[0],
        });
      }
    }
  };
  return (
    <div className="container" style={{ marginTop: "45px" }}>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label for="username">Username</label>
          <input
            value={userData.username}
            onChange={(e) =>
              setuserData({ ...userData, username: e.target.value })
            }
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            Your username should be unique
          </small>
          {errors.username_error !== null && (
            <div className="alert alert-danger">{errors.username_error}</div>
          )}
        </div>
        <div className="form-group">
          <label for="username">First Name</label>
          <input
            value={userData.first_name}
            onChange={(e) =>
              setuserData({ ...userData, first_name: e.target.value })
            }
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="form-group">
          <label for="username">Last Name</label>
          <input
            value={userData.last_name}
            onChange={(e) =>
              setuserData({ ...userData, last_name: e.target.value })
            }
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="form-group">
          <label for="email">Email address</label>
          <input
            value={userData.email}
            onChange={(e) =>
              setuserData({ ...userData, email: e.target.value })
            }
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            required
          />

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
          {errors.email_error !== null && (
            <div className="alert alert-danger">{errors.email_error}</div>
          )}
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            value={userData.password}
            onChange={(e) =>
              setuserData({ ...userData, password: e.target.value })
            }
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <div className="form-group">
          <label for="password">Confirm Password</label>
          <input
            value={userData.password2}
            onChange={(e) =>
              setuserData({ ...userData, password2: e.target.value })
            }
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        {errors.password_error !== null && (
          <div className="alert alert-danger">{errors.password_error}</div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <br />
    </div>
  );
};

export default Register;
