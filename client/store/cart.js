import axios from "axios";

// Action Types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const SET_CART = "SET_CART";

//Guest action types
const GUEST_TO_CART = "GUEST_TO_CART";
const GUEST_CART = "GUEST_CART";
const GUEST_REMOVE_ITEM = "GUEST_REMOVE_ITEM";

// Action Creators
const addToCart = (cartItem) => ({
  type: ADD_TO_CART,
  cartItem,
});
export const _removeFromCart = (vehicleId, orderId) => {
  return {
    type: REMOVE_FROM_CART,
    vehicleId,
    orderId,
  };
};
export const _setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

// Guest action Creators
const _guestSetCart = (cart) => ({
  type: GUEST_CART,
  cart,
});

// Thunk Creators
export const removeFromCart = (vehicleId, orderId) => {
  return async (dispatch) => {
    //change to remove from through table
    try {
      const { data } = await axios.put(`/api/orders/remove_vehicle`, {
        orderId: orderId,
        vehicleId: vehicleId,
      });
      dispatch(_removeFromCart(vehicleId, orderId));
    } catch (error) {
      console.log("Error deleting cars from server", error);
    }
  };
};

export const setCart = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/users/orders`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_setCart(data[0].vehicles));
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};

export const cartLogout = () => {
  return {
    type: SET_CART,
    cart: [],
  };
};

export const addToCartThunk = (orderId, vehicleId, quantity, token) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.put(
        `/api/orders/add_vehicle`,
        {
          orderId,
          vehicleId,
          quantity,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(addToCart(cart));
    } catch (error) {
      console.error(error);
    }
  };
};

//guest THUNKS
export const guestAddToCartThunk = (vehicleId, quantity) => {
  return async () => {
    try {
      const item = {
        vehicleId: vehicleId,
        quantity: quantity,
      };

      let guestCart = JSON.parse(window.localStorage.getItem("GUESTCART"));

      guestCart.push(item);
      window.localStorage.setItem("GUESTCART", JSON.stringify(guestCart));
    } catch (error) {
      console.error(error);
    }
  };
};

export const guesetRemoveItemThunk = (vehicleId) => {
  return async (dispatch) => {
    try {
      let guestCart = JSON.parse(window.localStorage.getItem("GUESTCART"));

      guestCart.map((element) => {
        element.vehicleId = parseInt(element.vehicleId);
      });

      guestCart = guestCart.filter((element) => {
        return element.vehicleId !== vehicleId;
      });

      guestCart = window.localStorage.setItem(
        "GUESTCART",
        JSON.stringify(guestCart)
      );

      dispatch(guestSetCart(guestCart));
    } catch (error) {
      console.error(error);
    }
  };
};
export const guestSetCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/vehicles`);

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

      dispatch(_guestSetCart(cart));
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};

export const updateCart =
  (orderId, vehicleId, val, token) => async (dispatch) => {
    try {
      await axios.put(`/api/orders/add_vehicle`, {
        orderId: orderId,
        vehicleId: vehicleId,
        quantity: val,
        fromCart: true,
      });
      dispatch(setCart(token));
    } catch (err) {
      console.debug(err);
    }
  };
//reducer
export default function (state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.cartItem;

    case REMOVE_FROM_CART:
      const filterCars = state.filter(
        (vehicle) => vehicle.id !== action.vehicleId
      );

      return filterCars;
    case SET_CART:
      return action.cart;
    // GUEST REDUCER
    case GUEST_TO_CART:
      return state.push(action.cartItem);

    case GUEST_CART:
      return action.cart;

    case GUEST_REMOVE_ITEM:
      const guestVehicles = state.filter((vehicle) => {
        return vehicle.id !== action.vehicleId;
      });
      return guestVehicles;

    default:
      return state;
  }
}
