import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import "./Cart.css";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => increaseQuantity(item.id)}
              onDecrease={() => decreaseQuantity(item.id)}
              onDelete={() => removeFromCart(item.id)}
            />
          ))
        )}
      </div>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: Ksh {totalPrice}</p>
        <Link to="/checkout" state={{ cartItems, totalPrice }}>
          <button className="checkout-button" disabled={cartItems.length === 0}>
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
