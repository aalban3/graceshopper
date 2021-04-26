import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import allVehicles from "./allVehicles";
import singleVehicle from "./singleVehicle";
import allUsers from "./allUsers";
import cart from "./cart";

const reducer = combineReducers({
  auth,
  vehicles: allVehicles,
  vehicle: singleVehicle,
  cart,
  users: allUsers
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./cart";
