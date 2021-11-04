import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import allVehicles from "./allVehicles";
import allUsers from "./allUsers";
import singleVehicle from "./singleVehicle";
import cart from "./cart";
import checkout from "./checkout";

const reducer = combineReducers({
  auth,
  vehicles: allVehicles,
  vehicle: singleVehicle,
  cart,
  checkout,
  users: allUsers,
});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
