import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Here you would typically send order data to a server
    console.log("Order placed:", { customer: formData, items: cartItems });

    setOrderPlaced(true);
    clearCart();
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <h2>Thank you for your order!</h2>
        <p>Your order has been placed successfully.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items before checking out.</p>
      ) : (
        <>
          <div className="order-summary mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="mb-1 flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>Ksh {item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="font-bold mt-2 flex justify-between">
              <span>Total:</span>
              <span>Ksh {totalPrice}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="name">
                Name
              </label>
              <input
                className={`w-full border p-2 rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">
                Email
              </label>
              <input
                className={`w-full border p-2 rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="address">
                Address
              </label>
              <textarea
                className={`w-full border p-2 rounded ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                className={`w-full border p-2 rounded ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}
