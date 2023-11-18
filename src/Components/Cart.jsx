import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../Redux/cartReducer/action';
import styled from 'styled-components';

const Cart = () => {
  // Redux-related hooks
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => ({
    cartItems: store.cartReducer.cartItems,
  }));

  // Function to handle removing an item from the cart
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Function to handle updating the quantity of an item in the cart
  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity(productId, newQuantity));
  };

  return (
    <CartContainer>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go shopping!</Link></p>
      ) : (
        <>
          {/* Display each item in the cart */}
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              {/* Display Product Image */}
              <div className="cart-image">
                <img src={item.image} alt={item.title} />
              </div>
              {/* Display Product Details */}
              <div className="cart-details">
                <h2>{item.title}</h2>
                <p>${item.price}</p>
                {/* Quantity Selector */}
                <div className="quantity-selector">
                  <p>Quantity:</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                  />
                </div>
                {/* Remove Item Button */}
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </CartItem>
          ))}
          {/* Display Total Price */}
          <TotalPrice>
            <p>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
          </TotalPrice>
          {/* Checkout Button */}
          <Link to="/checkout">
            <CheckoutButton>Proceed to Checkout</CheckoutButton>
          </Link>
        </>
      )}
    </CartContainer>
  );
};

const CartContainer = styled.div`
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin: 20px;
  text-align: center;

  h1 {
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
  }

  a {
    color: #00cc44;
    font-weight: bold;
  }
`;

const CartItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;

  .cart-image {
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }

  .cart-details {
    margin-left: 20px;

    h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      p {
        margin-right: 10px;
        font-weight: bold;
      }

      input {
        width: 50px;
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: 5px;
        text-align: center;
      }
    }

    button {
      background-color: #ff4d4d;
      color: white;
      padding: 8px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

const TotalPrice = styled.div`
  margin-top: 20px;
  p {
    font-size: 20px;
    font-weight: bold;
  }
`;

const CheckoutButton = styled.button`
  margin-top: 20px;
  background-color: #00cc44;
  color: white;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default Cart;
