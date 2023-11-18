// reducer.js
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from './actionType';

const initialState = {
  items: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
        return {
          ...state,
          total: state.total + existingItem.price,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...newItem, quantity: 1 }],
          total: state.total + newItem.price,
        };
      }

    case REMOVE_FROM_CART:
      const productId = action.payload;
      const updatedItems = state.items.filter((item) => item.id !== productId);
      const removedItem = state.items.find((item) => item.id === productId);

      return {
        ...state,
        items: updatedItems,
        total: state.total - removedItem.price * removedItem.quantity,
      };

    case UPDATE_QUANTITY:
      const { productId: updatedProductId, newQuantity } = action.payload;
      const updatedCartItems = state.items.map((item) =>
        item.id === updatedProductId ? { ...item, quantity: parseInt(newQuantity, 10) } : item
      );

      return {
        ...state,
        items: updatedCartItems,
        total: updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };

    default:
      return state;
  }
};

export default cartReducer;
