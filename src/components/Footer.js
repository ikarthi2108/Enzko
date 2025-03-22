import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaTshirt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <FaTshirt size={40} className="text-primary mb-3" />
            <h4 className="mb-3">Garment Management System</h4>
            <div className="d-flex justify-content-center gap-4 mb-3">
              <Link to="/about" className="text-secondary text-decoration-none">About</Link>
              <Link to="/services" className="text-secondary text-decoration-none">Services</Link>
              <Link to="/contact" className="text-secondary text-decoration-none">Contact</Link>
              <Link to="/privacy" className="text-secondary text-decoration-none">Privacy</Link>
              <Link to="/admin" className="text-secondary text-decoration-none">Admin</Link>
            </div>
            <p className="text-secondary mb-0">© 2025 Garment Management System. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
