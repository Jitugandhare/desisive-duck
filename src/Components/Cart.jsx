
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Redux/cartReducer/action';
import styled from 'styled-components';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cartReducer);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity(productId, newQuantity));
  };

  return (
    <CartContainer>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id}>
              <div className="cart-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-details">
                <h2>{item.title}</h2>
                <p>${item.price}</p>
                <div className="quantity-selector">
                  <p>Quantity:</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                  />
                </div>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </CartItem>
          ))}
          <TotalPrice>
            <p>Total: ${total.toFixed(2)}</p>
            <Link to="/product_details/:id/checkout">
            <CheckoutButton>Proceed to Checkout</CheckoutButton>
          </Link>
          </TotalPrice>
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
