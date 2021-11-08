import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/home";
import SingleVehicleScreen from "./components/SingleVehicleScreen";
import { me } from "./store";
import { setCart } from "./store/cart";
import AllVehiclesScreen from "./components/AllVehiclesScreen";
import Cart from "./components/Cart";
import ManageVehicles from "./components/admin/ManageVehicles";
import ManageUsers from "./components/admin/ManageUsers";
import ManageSingleOrder from "./components/admin/ManageSingleOrder";
import Checkout from "./components/checkout/Checkout";
import CheckoutConfirmation from "./components/checkout/CheckoutConfirmation";
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" component={Login} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={Home} />
              {isLoggedIn && isAdmin && (
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={Home} />
                  <Route path="/vehicles" component={AllVehiclesScreen} />
                  <Route path="/manage_vehicles" component={ManageVehicles} />
                  <Route
                    path="/manage_users/orders/:orderId"
                    component={ManageSingleOrder}
                  />
                  <Route path="/manage_users" component={ManageUsers} />
                </Switch>
              )}
              <Route
                exact
                path="/vehicles/:id"
                component={SingleVehicleScreen}
              />
              <Route path="/vehicles" component={AllVehiclesScreen} />
              <Route path="/cart" component={Cart} />
              <Route exact path="/checkout" component={Checkout} />
              <Route path="/confirmation" component={CheckoutConfirmation} />
            </Switch>
          )}

          <Route path="/signup" component={Signup} />
          <Route exact path="/vehicles/:id" component={SingleVehicleScreen} />
          <Route path="/vehicles" component={AllVehiclesScreen} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/confirmation" component={CheckoutConfirmation} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
    readyToCheckout: state.checkout.isReady,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadCart(id) {
      dispatch(setCart(id));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
