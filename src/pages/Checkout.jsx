import React from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="checkout-container">
      <h2>Order Summary</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="order-summary">
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} = Ksh {item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: Ksh {totalPrice}</p>
        </div>
      )}
    </div>
  );
}
