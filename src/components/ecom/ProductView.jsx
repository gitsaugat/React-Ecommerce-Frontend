import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectedProduct } from "../../redux/actions/ProductAction";
import { BASE_URL } from "../../utils";
import Products from "./Products";

const ProductView = () => {
  const { id } = useParams();
  const { name, description, get_image_url, price } = useSelector(
    (state) => state.all_products.product
  );
  const dispatch = useDispatch();

  const fetchProduct = async (url) => {
    const response = await fetch(url);
    const json_data = await response.json();
    dispatch(selectedProduct(json_data));
  };
  useEffect(() => {
    fetchProduct(`${BASE_URL}/api/v1/product/${id}`);
  }, [id]);

  return (
    <div>
      <div class="container" style={{ margin: "auto" }}>
        <br />
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
      <Products />
    </div>
  );
};

export default ProductView;
