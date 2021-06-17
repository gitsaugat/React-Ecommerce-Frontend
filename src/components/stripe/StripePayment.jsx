import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkoutform from "./Checkoutform";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51ICy9QFynavadh4l6xAqRalcKAw5Cj3QZVKmTc11egr4X4jTaMmPZ5jemUZFnIxw5ri0hbLzhpawVZOBOsnCj0UH00geQMlFiH"
);

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <div
        style={{
          borderRadius: "10px",
          padding: "10px",
          margin: "auto",
          marginTop: "70px",
          width: "50%",
        }}
      >
        <Checkoutform />
      </div>
    </Elements>
  );
};

export default App;
