import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryProducts } from "../../redux/actions/ProductAction";
import { BASE_URL } from "../../utils";
import Product from "./Product";
const CategoryProducts = () => {
  const [defaultCategory, setDefaultCategory] = useState(0);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const fetchProducts = async (url) => {
    const response = await fetch(url, {
      method: "GET",
    });
    const json_data = await response.json();
    if (defaultCategory === 0) {
      console.log("all");
      dispatch(categoryProducts(state.all_products.products));
    } else {
      const category_data = json_data;
      const data = category_data.filter(
        (new_data) => new_data.id === defaultCategory
      );
      dispatch(categoryProducts(data));
    }
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
        <div class="d-flex justify-content-center">
          <select className="form-control" style={{ width: "120px" }}>
            <option value="cat1">category</option>
          </select>
        </div>
      </form>
      <div className="container">
        <div className="row">
          {state.categories.category_products.map((prod) => (
            <Product
              imageUrl={prod.get_image_url}
              title={prod.name}
              price={prod.price}
              product_id={prod.id}
              desc={prod.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
