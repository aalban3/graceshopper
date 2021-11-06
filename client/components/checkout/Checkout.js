import React, { Component } from "react";
import { connect } from "react-redux";
import {
  checkOut,
  setCheckout,
  guestCheckOut,
  guestCheckedOut,
} from "../../store/checkout";
import { cartLogout } from "../../store/cart";
import Button from "react-bootstrap/Button";
export class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      isConfirmed: false,
    };
    this.handleComplete = this.handleComplete.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }
  componentDidMount() {
    const TOKEN = window.localStorage.getItem("token");
    if (TOKEN) {
      this.props.fetchCart(TOKEN);
    } else {
      this.props.guesTCheckOut();
    }
  }

  handleComplete(vehicles) {
    const orderId = window.localStorage.getItem("order_id");
    const TOKEN = window.localStorage.getItem("token");
    if (TOKEN) {
      this.props.checkOutCart(orderId, vehicles, TOKEN);
      this.props.clearCart();
    } else {
      this.props.clearGuestCart();
      this.props.clearCart();
    }
  }
  handleGoBack() {
    this.props.history.push("/cart");
  }
  render() {
    const vehicles = this.props.vehicles || [];
    const total =
      vehicles.reduce((acc, curr) => {
        return acc + curr.order_vehicle.quantity * curr.price;
      }, 0) || 0;
    const priceFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return (
      <div className="cart-container">
        <div className="cart-area">
          <div className="cart-top">
            <big>Checkout Your Cart</big>
            <div>
              <Button variant="warning" onClick={this.handleGoBack}>
                Return To Cart
              </Button>
            </div>
          </div>
          <table className="cart-items">
            <tbody>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              {vehicles.map((vehicle) => {
                return (
                  <tr className="single-cart-item" key={vehicle.id}>
                    <td>
                      <img className="cart-img" src={vehicle.imageUrl} />
                      <p>{vehicle.vehicleName}</p>
                    </td>
                    <td>
                      <p>{vehicle.order_vehicle.quantity}</p>
                    </td>
                    <td>{priceFormatter.format(vehicle.price)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="checkout-total">
            <big>Total: {priceFormatter.format(total)}</big>
            <Button
              variant="success"
              onClick={() => this.handleComplete(vehicles)}
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    vehicles: state.checkout.vehicles,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => ({
  checkOutCart: (id, items, token) => dispatch(checkOut(id, items, token)),
  fetchCart: (id) => dispatch(setCheckout(id)),
  clearCart: () => dispatch(cartLogout()),
  guesTCheckOut: () => dispatch(guestCheckOut()),
  clearGuestCart: () => dispatch(guestCheckedOut()),
});
export default connect(mapState, mapDispatch)(Checkout);
