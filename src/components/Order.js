import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Order = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [address, setAddress] = useState({ street: '', city: '', state: '', zipCode: '' });
  const [quantities, setQuantities] = useState({});
  const [paymentToastId, setPaymentToastId] = useState(null);
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
      
      // Initialize quantities object with minimum quantities
      const initialQuantities = {};
      res.data.forEach(product => {
        initialQuantities[product.id] = product.minQty;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleQuantityChange = (productId, value) => {
    const product = products.find(p => p.id === productId);
    const newValue = parseInt(value);
    
    if (isNaN(newValue) || newValue < product.minQty) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: product.minQty
      }));
    } else if (newValue > product.availableQty) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: product.availableQty
      }));
    } else {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: newValue
      }));
    }
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id];
    const productWithQuantity = { 
      ...product, 
      quantity: quantity,
      totalPrice: product.price * quantity
    };
    
    setCart([...cart, productWithQuantity]);
    toast.success(`${quantity} ${product.productName}(s) added to cart!`);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    toast.error(`${cart[index].productName} removed from cart!`);
  };

  const handleBuyNow = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }
    setShowModal(true);
  };

  const handlePlaceOrder = async () => {
    // Validate form
    if (!contact.name || !contact.phone || !contact.email || 
        !address.street || !address.city || !address.state || !address.zipCode) {
      toast.error("Please fill all required fields!");
      return;
    }

    setIsLoading(true);

    try {
      // Store the toast ID so we can dismiss it later
      const toastId = toast.info(`Processing payment of ₹${calculateTotal()}...`, {
        autoClose: false,
      });
      setPaymentToastId(toastId);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      await axios.post("http://localhost:5000/api/received-orders", {
        items: cart,
        contact,
        address,
        totalAmount: calculateTotal()
      });
      
      // Dismiss the payment processing toast
      toast.dismiss(toastId);
      
      toast.success("Payment successful! Order placed successfully!");
      setCart([]);
      setShowModal(false);
    } catch (error) {
      console.error("Error placing order", error);
      
      // Dismiss the payment processing toast
      if (paymentToastId) {
        toast.dismiss(paymentToastId);
      }
      
      toast.error("Payment failed! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.totalPrice || item.price), 0).toFixed(2);
  };

  return (
    <div style={{ backgroundColor: '#1a365d', minHeight: '100vh' }}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col">
            <h1 className="display-4 text-center text-white" data-aos="fade-down">Place Order</h1>
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
                        
                        {/* Quantity Selection */}
                        <div className="quantity-selector mt-3">
                          <label htmlFor={`quantity-${product.id}`} className="form-label">Quantity:</label>
                          <div className="input-group">
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => handleQuantityChange(product.id, (quantities[product.id] || product.minQty) - 1)}
                              disabled={(quantities[product.id] || product.minQty) <= product.minQty}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <input
                              type="number"
                              className="form-control text-center"
                              id={`quantity-${product.id}`}
                              value={quantities[product.id] || product.minQty}
                              min={product.minQty}
                              max={product.availableQty}
                              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            />
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => handleQuantityChange(product.id, (quantities[product.id] || product.minQty) + 1)}
                              disabled={(quantities[product.id] || product.minQty) >= product.availableQty}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
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
                            <small className="text-muted">
                              {item.quantity || 1} x ₹{item.price} = ₹{item.totalPrice || item.price}
                            </small>
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
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span>
                          <i className="bi bi-arrow-repeat"></i> Processing...
                        </span>
                      ) : (
                        <span>
                          <i className="bi bi-bag-check"></i> Checkout
                        </span>
                      )}
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

      {/* Modal for Contact and Address Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Contact and Address Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Street <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street address"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your state"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Zip Code <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your zip code"
                value={address.zipCode}
                onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePlaceOrder} disabled={isLoading}>
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </Modal.Footer>
      </Modal>

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