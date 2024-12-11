import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/FarmerHomePage.css';
import Navbar from '../components/NavBar';

const FarmerHomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const farmerId = localStorage.getItem('farmerId');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://dakshkrish-backend-production.up.railway.app/api/farmers/${farmerId}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } else {
        setError('Failed to load products.');
      }
    } catch (err) {
      setError('Error fetching products.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://dakshkrish-backend-production.up.railway.app/api/farmers/${farmerId}/delete-product/${productId}`,
        { method: 'DELETE' }
      );
      if (response.ok) {
        alert('Product deleted successfully!');
        setProducts(products.filter((product) => product.id !== productId));
        setFilteredProducts(filteredProducts.filter((product) => product.id !== productId));
      } else {
        alert('Failed to delete product.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Error occurred while deleting the product.');
    }
  };

  const handleEdit = (productId) => navigate(`/farmers/${farmerId}/edit-product/${productId}`);

  return (
    <div className="farmer-homepage" style={{ height: '100vh', overflowY: 'auto' }}>
      <Navbar />
      <div
        style={{
          position: 'sticky',
          top: '60px', // Adjust according to Navbar height
          zIndex: 100,
          backgroundColor: '#fff',
          padding: '10px 20px',
          borderBottom: '1px solid #ccc',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBottom: '10px',
          }}
        >
          Your Products
        </h2>
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
            marginTop: '10px',
          }}
        />
      </div>

      <div
        className="content"
        style={{
          paddingTop: '20px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '20px',
          overflowY: 'scroll', // This makes the content area scrollable
          maxHeight: 'calc(100vh - 120px)', // Adjust for sticky header and navbar height
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={`https://dakshkrish-backend-production.up.railway.app/${product.imageUrl || 'default-image-path.jpg'}`}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>₹{product.price}</p>
                <div className="product-actions">
                  <button className="btn-edit" onClick={() => handleEdit(product.id)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerHomePage;
