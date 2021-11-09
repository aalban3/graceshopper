import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { updateCart } from "../store/cart";

class SingleCartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.handleQtyChange = this.handleQtyChange.bind(this);
  }
  componentDidMount() {
    this.setState({ quantity: this.props.vehicle.order_vehicle.quantity });
  }

  async handleQtyChange(evt) {
    this.setState({ quantity: +evt.target.value });
    let token = window.localStorage.getItem("token");
    let orderId = window.localStorage.getItem("order_id");

    if (!token) {
      let guestCart = JSON.parse(window.localStorage.getItem("GUESTCART"));
      guestCart[0].quantity = Number(evt.target.value);
      window.localStorage.setItem("GUESTCART", JSON.stringify(guestCart));
    } else {
      this.props.updateCart(
        orderId,
        this.props.vehicle.id,
        +evt.target.value,
        token
      );
    }

    this.setState({ quantity: evt.target.value });
  }

  render() {
    const { vehicle, handleClick, orderId } = this.props;
    const priceFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    return (
      <>
        <tr className="single-cart-item" key={vehicle.id}>
          <td className="cart-item-row">
            <img className="cart-img" src={vehicle.imageUrl} />
            <div className="cart-item-col">
              <Link to={`/vehicles/${vehicle.id}`} className="cart-item-name">
                {vehicle.make} {vehicle.model}{" "}
              </Link>
              <div className="cart-item-modify">
                <select
                  value={this.state.quantity}
                  onChange={this.handleQtyChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <Button
                  className="remove"
                  variant="danger"
                  onClick={() => handleClick(vehicle.id, orderId)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </div>
            </div>
          </td>
          <td></td>
          <td>{priceFormatter.format(vehicle.price)}</td>
        </tr>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => ({
  updateCart: (orderId, vehicleId, val, token) =>
    dispatch(updateCart(orderId, vehicleId, val, token)),
});

export default connect(mapState, mapDispatch)(SingleCartItem);
