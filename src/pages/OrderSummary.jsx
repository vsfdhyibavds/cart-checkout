import React from "react";
import { useCart } from "../context/CartContext";
import OrderSummary from "./OrderSummary";

export default function Checkout() {
  const { cartItems } = useCart();

  return (
    <div className="checkout-container">
      <h2>Order Summary</h2>
      <OrderSummary cartItems={cartItems} />
    </div>
  );
}
