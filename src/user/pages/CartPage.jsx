import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../pages/css/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`https://dakshkrish-backend-production.up.railway.app/api/cart/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        alert('Failed to fetch cart items.');
      }
    } catch (err) {
      alert('Error fetching cart items.');
    }
  };

  return (
    <div className="cart-container">
      <Navbar />
      <h1 className="cart-header">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={`https://dakshkrish-backend-production.up.railway.app/${item.product.imageUrl || 'default-image.jpg'}`}
                alt={item.product.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                <p>{item.product.description}</p>
                <p>Category: {item.product.category}</p>
                <p>Price: ₹{item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
