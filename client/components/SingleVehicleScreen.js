import React, { Component } from "react";
import { connect } from "react-redux";
import { getSingleVehicleThunk } from "../store/singleVehicle";
import { withSnackbar } from "notistack";
import cart, { addToCartThunk, guestAddToCartThunk } from "../store/cart";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";

class SingleVehicleScreen extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      isLoading: true,
      canAdd: true 
    };

    this.handleAddCartItem = this.handleAddCartItem.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
  }

  handleSnackbar() {
    const vehicleInCart = this.props.cart.filter(vehicle=>vehicle.id = this.props.match.params.id)
    let check3=false;
    if(vehicleInCart.length!==0) check3=vehicleInCart[0].order_vehicle.quantity===3
    if(check3){
      this.key = this.props.enqueueSnackbar(
        "Cannot exceed 3 of the same car in an order!",
        {
          variant: "warning",
        }
      );
    }
    else if(this.props.vehicle.quantity < this.state.quantity){
      this.key = this.props.enqueueSnackbar(
        "Not enough vehicles in stock!",
        {
          variant: "error",
        }
      );
    }
    else{
    this.key = this.props.enqueueSnackbar(
      "Your Vehicle was added to the cart!",
      {
        variant: "success",
      }
    );
    }
  }
  componentDidMount() {
    this.props.getSingleVehicle(this.props.match.params.id);
    this.setState({
      isLoading: false,
    });
  }

  handleAddCartItem(evt) {
    evt.preventDefault();
    
    const orderId = window.localStorage.getItem("order_id");
    const token = window.localStorage.getItem("token");
    const quantityInInvetory = this.props.vehicle.quantity
    // const quantityInCart = this.props.vehicle.order_vehicle.quantity 
    console.log('props-->', this.props)
    console.log('quantityInInventory---->', quantityInInvetory)
    // console.log('quantityInCart-->', quantityInCart)

    // if (token) {

    //   this.props.addNewToCart(
    //     orderId,
    //     +this.props.match.params.id,
    //     this.state.quantity,
    //     token
    //   );
    // } else {
    //   this.props.guestAddToCart(
    //     this.props.match.params.id,
    //     this.state.quantity
    //   );
    // }
  }

  handleQtyChange(evt) {
    this.setState({ quantity: Number(evt.target.value) });
  }

  render() {
    const { vehicle } = this.props;
    if (this.state.isLoading) {
      return (
        <div className="loading-screen">
          <ReactLoading
            type={"spokes"}
            color={"#ffc107"}
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
      <div className="singlevehicle">
        <div className="container">
          <div className="top-info">
            <div>
              <img className="logo-img" src={vehicle.logoUrl} />
              <span className="vehicle-name">{vehicle.vehicleName}</span>
            </div>
            <span className="vehicle-price">
              {priceFormatter.format(vehicle.price)}
            </span>
          </div>
          <div className="vehicle-card">
            <div className="img-description">
              <img src={vehicle.imageUrl} />
              <img className="logo-img logo-footer" src={vehicle.logoUrl} />
              <div className="img-description-right">
                <p className="vechicle-description">{vehicle.description}</p>
                <div className="vehicle-form">
                  {vehicle.quantity === 0 ? (
                    <div className="single-car-sold-out">
                      {" "}
                      <big> SOLD OUT </big>
                    </div>
                  ) : (
                    <form onSubmit={this.handleAddCartItem}>
                      <select
                        className="vehicle-form-select"
                        onChange={this.handleQtyChange}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <Button
                        variant="warning"
                        type="submit"
                        onClick={this.handleSnackbar}
                        disabled={!this.state.canAdd}
                      >
                        Add to cart
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SingleVehicleScreen.propTypes = {
  vehicle: PropTypes.object,
};

const mapState = (state) => ({
  vehicle: state.vehicle,
  auth: state.auth,
  cart: state.cart
});

const mapDispatch = (dispatch) => ({
  getSingleVehicle: (id) => dispatch(getSingleVehicleThunk(id)),
  addNewToCart: (orderId, vehicleId, quantity, token) =>
    dispatch(addToCartThunk(orderId, vehicleId, quantity, token)),
  guestAddToCart: (vehicle, quantity) =>
    dispatch(guestAddToCartThunk(vehicle, quantity)),
});

export default withSnackbar(
  connect(mapState, mapDispatch)(SingleVehicleScreen)
);
