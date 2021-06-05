import React, { useMemo } from "react";
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const StripePayment = () => {
  const stripePromise = loadStripe("");
  const options = {
    style: {
      base: {
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <div>
      <form>
        <Elements stripe={stripePromise}>
          <CardElement options={options} />
        </Elements>
      </form>
    </div>
  );
};

export default StripePayment;
