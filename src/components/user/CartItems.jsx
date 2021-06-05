import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../utils";
import { get_cart_items } from "../../redux/actions/UserAction";

const CartItems = ({ title, image_url, quantity, per_price, item_id }) => {
  const state = useSelector((state) => state);
  const { x_f_token } = state.login_reducer;
  const dispatch = useDispatch();

  const fetch_cart_items = async (url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${state.login_reducer.x_f_token}`,
      },
    });
    const json_data = await response.json();
    dispatch(get_cart_items(json_data));
  };

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
    if (request.status === 200) {
      fetch_cart_items(`${BASE_URL}/api/v1/my/orders/`);
    }
  };
  const handle_decrement = async (id) => {
    const url = `${BASE_URL}/api/v1/remove/cart/`;
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
    // const response = await request.json();
    if (request.status === 200) {
      fetch_cart_items(`${BASE_URL}/api/v1/my/orders/`);
    }
  };

  return (
    <tr>
      <th>{title}</th>
      <td>
        <img height="40" src={image_url} alt="order-image" />
      </td>
      <td>{quantity}</td>
      <td>${per_price}</td>
      <td>${per_price * quantity}</td>
      <td>
        <button onClick={() => handle_increment(item_id)} className="btn ">
          ⬆️
        </button>
        &nbsp;
        <button onClick={() => handle_decrement(item_id)} className="btn ">
          ⬇️
        </button>
      </td>
    </tr>
  );
};

export default CartItems;
