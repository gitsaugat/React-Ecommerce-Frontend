import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { BASE_URL } from "../../utils";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Checkoutform = (props) => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    contact_no: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card_elem = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card_elem,
    });
    if (error) {
      return "";
    } else {
      const token = await stripe.createToken(card_elem);
      const response = await fetch(BASE_URL + "/api/v1/stripe/payment/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("x_token")}`,
        },
        body: JSON.stringify({
          token: token,
          user_data: data,
        }),
      });
      const jsonResponse = await response.json();
      if (response.status === 200) {
        history.push("/");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="text-muted">Full Name</label>
        <br />
        <input
          type="test"
          placeholder="John Doe"
          className="form-control"
          required
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <br />
        <label className="text-muted">Delivery Address</label>
        <br />

        <input
          type="text"
          placeholder="street 1:"
          className="form-control"
          required
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
        <br />
        <label className="text-muted">Contact No</label>
        <br />

        <input
          type="text"
          placeholder="+977-982400000"
          className="form-control"
          required
          value={data.contact_no}
          onChange={(e) => setData({ ...data, contact_no: e.target.value })}
        />
        <br />
        <label className="text-muted">Email</label>
        <br />

        <input
          type="email"
          placeholder="johndoe@email.com"
          className="form-control"
          required
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <br />
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button type="submit" className="btn btn-primary">
            Checkout
          </button>
        </div>
      </div>
    </form>
  );
};

export default Checkoutform;
