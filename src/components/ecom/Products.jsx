import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/ProductAction";
import { BASE_URL } from "../../utils";
import Product from "./Product";

const Products = () => {
  const state = useSelector((state) => state.all_products.products);
  const dispath = useDispatch();
  const fetchProducts = async (url) => {
    const response = await fetch(url);
    const json_data = await response.json();
    dispath(setProducts(json_data));
  };
  useEffect(() => {
    fetchProducts(`${BASE_URL}/api/v1/products`);
  }, []);
  return (
    <div className="container">
      <br />
      <div className="row">
        {state.map((prod) => (
          <Product
            key={prod.id}
            title={prod.name}
            imageUrl={prod.get_image_url}
            desc={prod.description}
            price={prod.price}
            product_id={prod.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
