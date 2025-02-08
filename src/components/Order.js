import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Order = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handleBuyNow = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/order", { items: cart });
      alert("Order placed successfully!");
      setCart([]);
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div style={{ backgroundColor: '#1a365d', minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col">
            <h1 className="display-4 text-center" data-aos="fade-down">Place Order</h1>
          </div>
        </div>

        <div className="row">
          {/* Products Section */}
          <div className="col-md-8">
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {products.map((product, index) => (
                <div key={product.id} className="col" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="card h-100 shadow-sm hover-effect">
                    <img
                      src={product.productImg}
                      className="card-img-top"
                      alt={product.productName}
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-0">{product.productName}</h5>
                        <span className="badge bg-primary">Size: {product.size}</span>
                      </div>
                      
                      <div className="product-details mb-3">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Available Quantity:</span>
                          <span className="fw-bold">{product.availableQty}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Minimum Order:</span>
                          <span className="fw-bold">{product.minQty} units</span>
                        </div>
                        <div className="price-tag p-2 bg-light rounded">
                          <h4 className="text-primary mb-0">₹{product.price}</h4>
                          <small className="text-muted">per unit</small>
                        </div>
                      </div>
                      
                      <button
                        className="btn btn-outline-primary w-100 transition-effect"
                        onClick={() => addToCart(product)}
                      >
                        <i className="bi bi-cart-plus"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="col-md-4" data-aos="fade-left">
            <div className="card shadow sticky-top" style={{ top: '2rem' }}>
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                  <i className="bi bi-cart3"></i> Shopping Cart
                </h4>
              </div>
              <div className="card-body">
                {cart.length > 0 ? (
                  <div>
                    {cart.map((item, index) => (
                      <div 
                        key={index} 
                        className="d-flex justify-content-between align-items-center mb-3"
                        data-aos="fade-right"
                        data-aos-delay={index * 50}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={item.productImg}
                            alt={item.productName}
                            className="rounded me-2"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                          <div>
                            <h6 className="mb-0">{item.productName}</h6>
                            <small className="text-muted">₹{item.price}</small>
                          </div>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger ms-2"
                          onClick={() => removeFromCart(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between mb-3">
                      <h5>Total:</h5>
                      <h5>₹{calculateTotal()}</h5>
                    </div>
                    <button
                      className="btn btn-success w-100 transition-effect"
                      onClick={handleBuyNow}
                    >
                      <i className="bi bi-bag-check"></i> Checkout
                    </button>
                  </div>
                ) : (
                  <div className="text-center my-4">
                    <i className="bi bi-cart-x display-4 text-muted"></i>
                    <p className="text-muted mt-2">Your cart is empty</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: white;
        }
        
        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
        }

        .transition-effect {
          transition: all 0.3s ease;
        }

        .transition-effect:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .sticky-top {
          z-index: 1020;
        }

        .price-tag {
          border-left: 4px solid #0d6efd;
        }

        .product-details {
          background-color: #f8f9fa;
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
};

export default Order;