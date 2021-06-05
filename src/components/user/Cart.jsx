import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../utils";
import { get_cart_items } from "../../redux/actions/UserAction";
import CartItems from "./CartItems";

const Cart = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const fetch_cart_items = async (url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${
          state.login_reducer.x_f_token
            ? state.login_reducer.x_f_token
            : localStorage.getItem("x_token")
        }`,
      },
    });
    const json_data = await response.json();
    dispatch(get_cart_items(json_data));
  };
  useEffect(() => {
    fetch_cart_items(`${BASE_URL}/api/v1/my/orders/`);
  }, []);
  return (
    // <div>{JSON.stringify(state.cart_items.cart_items.orderitem_orders)}</div>
    <div className="container">
      <br />
      <br />
      <br />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">image</th>
            <th scope="col">quantity</th>
            <th scope="col">price/per</th>
            <th scope="col">total</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.cart_items.cart_items.orderitem_orders !== undefined
            ? state.cart_items.cart_items.orderitem_orders.map((items) => (
                <CartItems
                  key={Math.random() * 100}
                  title={items.product.name}
                  image_url={BASE_URL + items.product.get_image_url}
                  quantity={items.quantity}
                  per_price={items.product.price}
                  item_id={items.product.id}
                />
              ))
            : "Loading ...."}
        </tbody>
      </table>
      <br />
      <div className="d-flex justify-content-between">
        <div></div>
        <h5 className="text-muted">
          Cart Total - ${state.cart_items.cart_items.get_cart_total}
        </h5>
      </div>
    </div>
  );
};
export default Cart;
