import React from "react";

export default function CartItem({ item, onIncrease, onDecrease, onDelete }) {
  return (
    <div className="cart-item">
      <img className="cart-item-image" src={item.image} />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-description">{item.description}</p>
        <h4 className="cart-item-price">Ksh{item.price}</h4>
      </div>
      <div className="quantity-controls">
        <button className="quantity-button" onClick={onDecrease}>
          -
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button className="quantity-button" onClick={onIncrease}>
          +
        </button>
      </div>
      <button onClick={onDelete} className="delete-button">
        Remove
      </button>
    </div>
  );
}
