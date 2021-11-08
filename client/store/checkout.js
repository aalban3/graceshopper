import axios from "axios";
// Action Types
const CHECKED_OUT = "CHECKED_OUT";
const SET_CHECKOUT_ITEMS = "SET_CHECKOUT_ITEMS";
const ORDERID = "order_id";
const SET_CHECKOUT = "SET_CHECKOUT";
const READY_FOR_CHECKOUT = "READY_FOR_CHECKOUT";
import { cartLogout } from "./cart";
// Action Creators
export const readyForCheckout = () => {
  return {
    type: READY_FOR_CHECKOUT,
    payload: null,
  };
};
export const checkedOut = () => {
  return {
    type: CHECKED_OUT,
    checkout: [],
  };
};
export const gotItems = (items) => {
  return {
    type: SET_CHECKOUT_ITEMS,
    items,
  };
};
export const _setCheckout = (cart) => {
  return {
    type: SET_CHECKOUT,
    cart,
  };
};

// Thunk Creators
export const checkOut = (orderId, vehicles, token) => {
  return async (dispatch) => {
    try {
      await dispatch(readyForCheckout());
      const { data } = await axios.put(
        `api/orders/${orderId}/checkout`,
        {
          vehicles,
        },
        {
          headers: {
            authorization: token,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      window.location.href = data.url;
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};

export const completeOrder = () => {
  return async (dispatch, getState) => {
    try {
      const { cart } = getState();
      const TOKEN = window.localStorage.getItem("token");
      const orderId = window.localStorage.getItem("order_id");

      const { data } = await axios.put(
        `api/orders/${orderId}/complete`,
        {
          vehicles: cart,
        },
        {
          headers: {
            authorization: TOKEN,
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      window.localStorage.setItem(ORDERID, data.id);
      dispatch(checkedOut());
      dispatch(cartLogout());
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};
export const guestCheckedOut = () => {
  return async (dispatch) => {
    try {
      window.localStorage.setItem("GUESTCART", "[]");
      dispatch(checkedOut());
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};

export const guestCheckOut = () => {
  return async (dispatch) => {
    try {
      let guestCart = JSON.parse(window.localStorage.getItem("GUESTCART"));
      guestCart.map(
        (element) => (element.vehicleId = parseInt(element.vehicleId))
      );
      const cart = [];
      for (let element of guestCart) {
        let { data: singlecar } = await axios.get(
          `/api/vehicles/${element.vehicleId}`
        );
        singlecar = {
          ...singlecar,
          order_vehicle: { quantity: element.quantity },
        };
        cart.push(singlecar);
        dispatch(guestSetCheckout(cart));
      }
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};
export const guestSetCheckout = () => {
  return async (dispatch) => {
    try {
      let guestCart = JSON.parse(window.localStorage.getItem("GUESTCART"));
      guestCart.map(
        (element) => (element.vehicleId = parseInt(element.vehicleId))
      );
      const cart = [];
      for (let element of guestCart) {
        let { data: singlecar } = await axios.get(
          `/api/vehicles/${element.vehicleId}`
        );
        singlecar = {
          ...singlecar,
          order_vehicle: { quantity: element.quantity },
        };
        cart.push(singlecar);
      }

      dispatch(_setCheckout(cart));
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};

export const setCheckout = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/orders`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(gotItems(data[0].vehicles || []));
    } catch (error) {
      console.log("Error fetching cars from server - checkout", error);
    }
  };
};
//reducer
const initialState = {
  isReady: false,
  vehicles: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case READY_FOR_CHECKOUT:
      return { ...state, isReady: true };
    case CHECKED_OUT:
      return { ...state, vehicles: action.checkout, isReady: false };
    case SET_CHECKOUT_ITEMS:
      return {
        ...state,
        vehicles: action.items,
        isReady: true,
      };
    case SET_CHECKOUT:
      return {
        ...state,
        vehicles: action.cart,
        isReady: true,
      };
    default:
      return state;
  }
}
