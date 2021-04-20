import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import allVehicles from "./allVehicles";
import singleVehicle from "./singleVehicle";
import cartReducer from "./cart";
const reducer = combineReducers({
  auth,
  vehicles: allVehicles,
  vehicle: singleVehicle,
  cart: cartReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
