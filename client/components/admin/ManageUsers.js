import React from "react";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../../store/allUsers";
import Button from "react-bootstrap/Button";
import ManageUserVehicles from "./ManageSingleOrder";

import { Link } from "react-router-dom";

export class ManageUsers extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.getUsers();
  }
  handleDelete(id) {
    this.props.removeUser(id);
  }

  render() {
    const users = this.props.users;
    console.log(users) 

    //priceFormatter converts integer price value from DB into dollar currency format
    // const priceFormatter = new Intl.NumberFormat("en-US", {
    //   style: "currency",
    //   currency: "USD",
    //   maximumFractionDigits: 0,
    // });

    return (
      <div>
        <div className="manage-vehicle-header">
          <p className="v-header">User</p>
          <p className="qty-header">Order</p>
          <p className="p-header">Status</p>
        </div>
        <div className="manage-table">
          {users.map((user) => (
            <div key={user.id} className="card-container">
            <div key={user.id} className="manage-card">
            <p className="img-col">{user.username}</p>
            <p className="price-col">
            {user.orders.map(order => (
              <div>
              <Link to={{
                  pathname: '/manage_users/orders',
                  state: {
                    vehicles: order.vehicles,
                    orderId: order.id
                  }}}>
              <div>{order.id}</div>
              </Link>
              <div>{order.status}</div> 
              </div>
            ))} </p>
            </div>
              
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
    removeUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(ManageUsers);
