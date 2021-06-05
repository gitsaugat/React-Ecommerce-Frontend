import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { randomProduct } from "../../redux/actions/ProductAction";
import { BASE_URL } from "../../utils";
const RandomProduct = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const fetchRandomProduct = async (url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("x_token")}`,
      },
    });
    const json_data = await response.json();
    dispatch(randomProduct(json_data));
  };
  useEffect(() => {
    const url = `${BASE_URL}/api/v1/random/product/`;
    fetchRandomProduct(url);
  }, []);
  const { name, get_image_url, description, price } =
    state.all_products.random_product;
  return (
    <div>
      <div class="container" style={{ margin: "auto" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="m-3">
            <img src={BASE_URL + get_image_url} height="500px" />
          </div>
          <div class="detail">
            <div className="text-muted">
              {name} - ${price}
            </div>
            <h1 className="heading">{name}</h1>
            <p class="text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              pariatur vel et earum quibusdam facere rerum, fugiat illo ad
              consectetur ut, dolore eveniet id enim amet iste tempora repellat
              suscipit! Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Error pariatur vel et earum quibusdam facere rerum, fugiat illo ad
              consectetur ut, dolore eveniet id enim amet iste tempora repellat
              suscipit!
            </p>
            <div className="d-flex m-2">
              <button className="btn btn-outline-primary m-2">
                Add to cart
              </button>
              <button className="btn btn-outline-danger m-2">${price}</button>
              <button className="btn btn-success m-2">Contact Seller</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomProduct;
