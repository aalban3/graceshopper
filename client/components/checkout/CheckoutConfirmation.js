import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { completeOrder } from "../../store/checkout";
export default function CheckoutConfirmation(props) {
  const dispatch = useDispatch();
  const handleClick = () => {
    props.history.push("/vehicles");
  };
  useEffect(() => {
    dispatch(completeOrder());
  }, []);

  return (
    <div className="checkout-confirmation">
      <div className="conf-container">
        <h1>Order confirmed!</h1>
        <h3>Your beautiful vehicles are on the way!</h3>
        <Button variant="warning" onClick={handleClick}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
