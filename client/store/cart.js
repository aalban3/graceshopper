import axios from "axios";
// Action Types
const ADD_ITEM = "ADD_ITEM";

// Action Creators
const addItem = (newItem) => ({
  type: ADD_ITEM,
  newItem,
});

// Thunk Creators
export const addToCart = (id) => {
  return async (dispatch) => {
    try {
      const { data: item } = await axios.get(`/api/vehicles/${id}`);
      dispatch(addItem(item));
    } catch (error) {
      console.log("Error fetching cars from server");
    }
  };
};

//reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.newItem];
    default:
      return state;
  }
}
