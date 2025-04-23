import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/dishes")
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((item) => ({
          ...item,
          quantity: 1,
        }));
        setCartItems(updatedData);
      });
  }, []);

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    fetch(` http://localhost:3000/dishes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => handleIncrease(item.id)}
            onDecrease={() => handleDecrease(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total: Ksh{totalPrice}</h3>
        </div>
        <Link to="/checkout">
          <button className="checkout-button">Checkout</button>
        </Link>
      </div>
    </div>
  );
}
