import React from "react";
import { BASE_URL } from "../../utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Product = ({ title, imageUrl, desc, price, product_id }) => {
  const new_image_url = BASE_URL + imageUrl;
  const state = useSelector((state) => state);
  const { x_f_token } = state.login_reducer;

  const handle_increment = async (id) => {
    const url = `${BASE_URL}/api/v1/add/cart/product/`;
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${x_f_token}`,
      },
      body: JSON.stringify({
        product_id: id,
        quantity: 1,
      }),
    });
    const response = await request.json();
    console.log(request.status);
  };
  return (
    <div className="col col-lg-4">
      <br />
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={new_image_url}
          height="300"
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
          <button
            onClick={() => handle_increment(product_id)}
            className="btn btn-primary"
          >
            {" "}
            🛒 - {price}
          </button>
          &nbsp; &nbsp; &nbsp;
          <Link
            className="btn btn-outline-success"
            to={`/product/${product_id}`}
          >
            👁️
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
