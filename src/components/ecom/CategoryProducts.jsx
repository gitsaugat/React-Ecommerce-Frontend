import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  categoryProducts,
  setCategory,
} from "../../redux/actions/ProductAction";
import { BASE_URL } from "../../utils";
import Product from "./Product";

const CategoryProducts = () => {
  const [defaultCategory, setDefaultCategory] = useState("all");

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const fetchProducts = async (url) => {
    const response = await fetch(url, {
      method: "GET",
    });
    const json_data = await response.json();

    dispatch(setCategory(json_data));
    if (defaultCategory !== "all") {
      const category_data = state.categories.categories;
      const newdata = category_data.filter(
        (data) => data.id.toString() === defaultCategory
      );
      console.log(newdata);
      dispatch(categoryProducts(newdata));
    } else {
      dispatch(categoryProducts(state.all_products.products));
    }
  };
  const category_change_handler = (e) => {
    setDefaultCategory(e.target.value);
  };
  useEffect(() => {
    fetchProducts(`${BASE_URL}/api/v1/products/categories/`);
  }, [defaultCategory]);
  return (
    <div>
      <br />
      <form className="container">
        <div className="d-flex justify-content-center">
          <input
            placeholder="Search"
            className="form-control"
            style={{ width: "420px" }}
          />
          &nbsp;
          <button type="submit" className="btn btn-outline-success">
            Search
          </button>
        </div>
        <br />
        <br />
        <div className="d-flex justify-content-center">
          <select
            value={defaultCategory}
            onChange={category_change_handler}
            className="form-control"
            style={{ width: "120px" }}
          >
            <option value={"all"}>all</option>

            {state.categories.categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </form>
      <div className="container">
        <div className="row">
          {state.categories.category_products.map((prod) =>
            prod.category_products !== undefined ? (
              prod.category_products.map((pro) => (
                <Product
                  key={Math.random() * 100}
                  imageUrl={pro.get_image_url}
                  title={pro.name}
                  price={pro.price}
                  product_id={pro.id}
                  desc={pro.description}
                />
              ))
            ) : (
              <Product
                key={Math.random() * 100}
                imageUrl={prod.get_image_url}
                title={prod.name}
                price={prod.price}
                product_id={prod.id}
                desc={prod.description}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
