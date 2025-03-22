import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Card, Container, Row, Col, Badge } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaTshirt, FaSearch, FaArrowLeft, FaBox, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    averagePrice: 0
  });
  const [orderData, setOrderData] = useState({
    productName: "",
    productImg: "",
    size: "M",
    availableQty: "",
    minQty: "",
    price: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      calculateStats();
    }
  }, [orders]);

  const calculateStats = () => {
    const totalProducts = orders.length;
    const totalQuantity = orders.reduce((acc, curr) => acc + Number(curr.availableQty), 0);
    const averagePrice = orders.reduce((acc, curr) => acc + Number(curr.price), 0) / totalProducts;

    setStats({
      totalProducts,
      totalQuantity,
      averagePrice: averagePrice.toFixed(2)
    });
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setOrderData({
      productName: "",
      productImg: "",
      size: "M",
      availableQty: "",
      minQty: "",
      price: "",
    });
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/order/${editId}`, orderData);
      } else {
        await axios.post("http://localhost:5000/api/order", orderData);
      }
      fetchOrders();
      handleClose();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const handleEdit = (order) => {
    setOrderData(order);
    setEditId(order._id);
    handleShow();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/api/order/${id}`);
        fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-light min-vh-100">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Container>
          <Button 
            variant="link" 
            className="text-white text-decoration-none p-0 me-3"
            onClick={() => navigate('/')}
          >
            <FaArrowLeft className="me-2" />
            Back to Home
          </Button>
          <span className="navbar-brand">
            <FaTshirt className="me-2" />
            Admin Dashboard
          </span>
        </Container>
      </nav>

      <Container fluid className="py-4">
        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="shadow-sm border-0 bg-primary text-white">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-white p-3 me-3">
                    <FaBox className="text-primary" size={24} />
                  </div>
                  <div>
                    <h6 className="mb-1">Total Products</h6>
                    <h3 className="mb-0">{stats.totalProducts}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 bg-success text-white">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-white p-3 me-3">
                    <FaBox className="text-success" size={24} />
                  </div>
                  <div>
                    <h6 className="mb-1">Total Quantity</h6>
                    <h3 className="mb-0">{stats.totalQuantity}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 bg-info text-white">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-white p-3 me-3">
                    <FaChartLine className="text-info" size={24} />
                  </div>
                  <div>
                    <h6 className="mb-1">Average Price</h6>
                    <h3 className="mb-0">₹{stats.averagePrice}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm border-0">
          <Card.Header className="bg-white py-3">
            <Row className="align-items-center">
              <Col>
                <h4 className="mb-0">Product Management</h4>
              </Col>
              <Col xs="auto">
                <Button variant="primary" onClick={handleShow}>
                  <FaPlus className="me-2" />
                  Add New Product
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row className="mb-4">
              <Col md={6}>
                <div className="search-box">
                  <div className="position-relative">
                    <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                    <Form.Control
                      type="text"
                      placeholder="Search products..."
                      className="ps-5 border-0 bg-light"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="bg-light">
                  <tr>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Size</th>
                    <th>Available Qty</th>
                    <th>Min Qty</th>
                    <th>Price/Unit</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        <div className="text-muted">
                          <FaBox size={32} className="mb-2" />
                          <p className="mb-0">No products found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <div className="fw-bold">{order.productName}</div>
                        </td>
                        <td>
                          <div className="product-image-container">
                            <img
                              src={order.productImg}
                              alt=""
                              className="rounded shadow-sm"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                          </div>
                        </td>
                        <td>
                          <Badge bg="primary" pill>
                            {order.size}
                          </Badge>
                        </td>
                        <td>{order.availableQty}</td>
                        <td>{order.minQty}</td>
                        <td>
                          <Badge bg="success" pill>
                          ₹{order.price}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(order)}
                          >
                            <FaEdit /> Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(order._id)}
                          >
                            <FaTrash /> Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="text-primary">
            {editId ? (
              <><FaEdit className="me-2" />Edit Product Details</>
            ) : (
              <><FaPlus className="me-2" />Add New Product</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={orderData.productName}
                    onChange={(e) =>
                      setOrderData({ ...orderData, productName: e.target.value })
                    }
                    className="border-0 bg-light"
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Image Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    value={orderData.productImg}
                    onChange={(e) =>
                      setOrderData({ ...orderData, productImg: e.target.value })
                    }
                    className="border-0 bg-light"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Size</Form.Label>
                  <Form.Select
                    value={orderData.size}
                    onChange={(e) =>
                      setOrderData({ ...orderData, size: e.target.value })
                    }
                    className="border-0 bg-light"
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Available Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter available quantity"
                    value={orderData.availableQty}
                    onChange={(e) =>
                      setOrderData({ ...orderData, availableQty: e.target.value })
                    }
                    className="border-0 bg-light"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Minimum Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter minimum quantity"
                    value={orderData.minQty}
                    onChange={(e) =>
                      setOrderData({ ...orderData, minQty: e.target.value })
                    }
                    className="border-0 bg-light"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price per Unit ($)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={orderData.price}
                    onChange={(e) =>
                      setOrderData({ ...orderData, price: e.target.value })
                    }
                    className="border-0 bg-light"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editId ? "Update Product" : "Add Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;