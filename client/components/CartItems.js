import React, { Component } from "react";
import { connect } from "react-redux";
import SingleCartItem from "./SingleCartItem";

export class CartItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, handleClick } = this.props;
    const orderId = window.localStorage.getItem("order_id");

    return (
      <table className="cart-items">
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th>Price</th>
          </tr>

          {items.map((item) => {
            return (
              <SingleCartItem
                key={item.id}
                vehicle={item}
                item={item.vehicle}
                handleClick={handleClick}
                orderId={orderId}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default connect(null, null)(CartItems);
