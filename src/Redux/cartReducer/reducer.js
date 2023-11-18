

import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART } from "./actionType";




const initialState = {
  items: [],
  total: 0,
};

const findCartItemIndex = (cartItems, productId) => {
  return cartItems.findIndex(item => item.id === productId);
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedItem = action.payload;
      const existingIndex = findCartItemIndex(state.items, addedItem.id);

      if (existingIndex !== -1) {
        // Item already exists in the cart, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingIndex].quantity += addedItem.quantity;
        return {
          ...state,
          items: updatedItems,
          total: state.total + addedItem.price * addedItem.quantity,
        };
      } else {
        // Item is not in the cart, add it
        return {
          ...state,
          items: [...state.items, addedItem],
          total: state.total + addedItem.price * addedItem.quantity,
        };
      }

    case REMOVE_FROM_CART:
      const removedItemId = action.payload;
      const updatedItemsAfterRemove = state.items.filter(item => item.id !== removedItemId);
      const removedItem = state.items.find(item => item.id === removedItemId);
      return {
        ...state,
        items: updatedItemsAfterRemove,
        total: state.total - (removedItem ? removedItem.price * removedItem.quantity : 0),
      };

    case UPDATE_CART_ITEM:
      const { productId, newQuantity } = action.payload;
      const updatedIndex = findCartItemIndex(state.items, productId);

      if (updatedIndex !== -1) {
        // Item found, update quantity
        const updatedItems = [...state.items];
        const updatedItem = { ...updatedItems[updatedIndex], quantity: newQuantity };
        updatedItems[updatedIndex] = updatedItem;
        return {
          ...state,
          items: updatedItems,
          total: state.total + (updatedItem.price * newQuantity - updatedItem.price * updatedItem.quantity),
        };
      } else {
        return state; // Item not found, no change
      }

    case CLEAR_CART:
      return initialState; // Clear the entire cart

    default:
      return state;
  }
};

export default cartReducer;
