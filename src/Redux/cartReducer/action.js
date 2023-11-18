

import { ADD_TO_CART,REMOVE_FROM_CART,UPDATE_CART_ITEM,CLEAR_CART } from "./actionType";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const updateQuantity = (productId, newQuantity) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, newQuantity },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
