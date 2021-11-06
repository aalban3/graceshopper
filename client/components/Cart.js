import React, { Component } from "react";
import {
  removeFromCart,
  setCart,
  guestSetCart,
  guesetRemoveItemThunk,
} from "../store/cart";

import { connect } from "react-redux";
import CartItems from "./CartItems";
import Button from "react-bootstrap/Button";
import ReactLoading from "react-loading";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
  }

  componentDidMount() {
    const TOKEN = window.localStorage.getItem("token");
    if (TOKEN) {
      this.props.getCart(TOKEN);
    } else {
      this.props.guestCart();
    }
    this.setState({
      isLoading: false,
    });
  }

  handleClick(vehicleId, orderId) {
    if (orderId) {
      this.props.removeFromCart(vehicleId, orderId);
    } else {
      this.props.guestRemoveItem(vehicleId);
    }
  }

  handleContinue() {
    this.props.history.push("/vehicles");
  }

  goToCheckout() {
    this.props.history.push("/checkout");
  }

  render() {
    const cart = this.props.cart || [];
    const numItems = !cart.length
      ? 0
      : cart.reduce((acc, item) => acc + item.order_vehicle.quantity, 0);
    cart.map((element) => (element.vehicleId = parseInt(element.vehicleId)));
    const itemTotal = cart.reduce((acc, curr) => {
      return acc + curr.order_vehicle.quantity * curr.price;
    }, 0);
    if (this.state.isLoading) {
      return (
        <div className="loading-screen">
          <ReactLoading
            type={"spokes"}
            color={"#FFC107"}
            height={500}
            width={250}
          />
        </div>
      );
    }

    const priceFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    return (
      <>
        <div className="cart-container">
          <div className="cart-area">
            <div className="cart-top">
              <big className="cart-title"> My Cart</big>
              <div>
                <Button variant="warning" onClick={this.handleContinue}>
                  {" "}
                  Continue Shopping
                </Button>
                <Button
                  variant={cart.length < 1 ? "secondary" : "warning"}
                  onClick={this.goToCheckout}
                  disabled={cart.length < 1}
                >
                  {" "}
                  Checkout{" "}
                </Button>
              </div>
            </div>
            {cart.length ? (
              <CartItems items={cart} handleClick={this.handleClick} />
            ) : (
              <div className="empty-cart">
                <p>Your Cart Is Empty</p>
              </div>
            )}
            <div className="cart-total">
              <p>
                Subtotal ({numItems}) items: {priceFormatter.format(itemTotal)}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  isLoggedIn: !!state.auth.id,
});

const mapDispatch = (dispatch) => ({
  removeFromCart: (vehicleId, orderId) =>
    dispatch(removeFromCart(vehicleId, orderId)),
  getCart: (id) => dispatch(setCart(id)),
  guestCart: () => dispatch(guestSetCart()),
  guestRemoveItem: (vehicleId) => dispatch(guesetRemoveItemThunk(vehicleId)),
});

export default connect(mapState, mapDispatch)(Cart);
