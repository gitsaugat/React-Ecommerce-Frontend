import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import CheckOutForm from "../user/CheckOutForm";
const stripePromise = loadStripe(
  "pk_test_51ICy9QFynavadh4l6xAqRalcKAw5Cj3QZVKmTc11egr4X4jTaMmPZ5jemUZFnIxw5ri0hbLzhpawVZOBOsnCj0UH00geQMlFiH"
);
const StripePayment = () => (
  <Elements stripe={stripePromise}>
    <CheckOutForm />
  </Elements>
);
export default StripePayment;
