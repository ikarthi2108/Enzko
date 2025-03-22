import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaTshirt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
      variant="dark" 
      fixed="top" 
      expand="lg"
      className={`transition-all duration-300 ${isScrolled ? 'bg-dark py-2' : 'bg-transparent py-3'}`}
    >
      <Container>
        <Navbar.Brand className="d-flex align-items-center overflow-hidden">
          <FaTshirt className="me-2" size={24} />
          <Link to="/" className="fw-bold text-decoration-none text-light">Enzko garment apparel</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => navigate('/')} className="mx-2">Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/about')} className="mx-2">About</Nav.Link>
            <Nav.Link href="#contact" className="mx-2">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
