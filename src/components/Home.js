import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button, Card, Form, Row, Col, Badge } from 'react-bootstrap';
import { FaTshirt, FaUsersCog, FaShoppingBag, FaPhone, FaArrowRight, FaCheckCircle, FaClock, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavigationBar from './NavigationBar';

const Home = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <NavigationBar/>
      {/* Hero Section */}
      <section id="home" className="position-relative min-vh-100 d-flex align-items-center overflow-hidden" 
        style={{
          background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
          overflow: 'hidden'
        }}>
        <div className="position-absolute w-100 h-100" style={{
          background: 'url("https://images.pexels.com/photos/2112648/pexels-photo-2112648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2") center/cover no-repeat',
          opacity: '0.1'
        }}></div>
        <Container className="position-relative">
          <Row className="align-items-center">
            <Col lg={6} data-aos="fade-right">
              <Badge bg="light" text="dark" className="mb-3 px-3 py-2">
                #1 Garment Management Solution
              </Badge>
              <h1 className="display-4 fw-bold text-white mb-4">
                Transform Your Garment Business with Smart Management
              </h1>
              <p className="lead text-white-50 mb-5">
                Streamline operations, boost productivity, and grow your business with our comprehensive garment management solution.
              </p>
              <div className="d-flex gap-3">
                <Button 
                  variant="light" 
                  size="lg"
                  onClick={() => navigate('/order')}
                  className="d-flex align-items-center"
                >
                  Order Now <FaArrowRight className="ms-2" />
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </div>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0" data-aos="fade-left">
              <div className="position-relative">
                <img 
                  src="https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Garment Management" 
                  className="img-fluid rounded-lg shadow-2xl"
                  style={{ transform: 'perspective(1000px) rotateY(-15deg)', maxWidth: '100%' }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-r from-primary to-transparent opacity-10"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center mb-5" data-aos="fade-up">
            <Col md={8} className="text-center">
              <h2 className="display-5 fw-bold mb-3">Why Choose Us?</h2>
              <p className="lead text-muted">Experience the difference with our cutting-edge features</p>
            </Col>
          </Row>
          <Row className="g-4">
            {[
              {
                icon: <FaUsersCog size={40} />,
                title: "Expert Management",
                description: "Our team of experts ensures smooth operation with advanced management tools."
              },
              {
                icon: <FaShoppingBag size={40} />,
                title: "Inventory Control",
                description: "Real-time inventory tracking with sophisticated monitoring systems."
              },
              {
                icon: <FaPhone size={40} />,
                title: "24/7 Support",
                description: "Round-the-clock dedicated support team for all your queries."
              }
            ].map((feature, index) => (
              <Col md={4} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <Card className="h-100 border-0 shadow-sm hover-lift">
                  <Card.Body className="text-center p-5">
                    <div className="text-primary mb-4">{feature.icon}</div>
                    <h4 className="mb-3">{feature.title}</h4>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} data-aos="fade-right">
              <h2 className="display-5 fw-bold mb-4">Our Services</h2>
              <p className="lead text-muted mb-5">Comprehensive solutions tailored for your success</p>
              <div className="d-flex mb-4">
                <div className="me-4">
                  <FaCheckCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h5>Order Management</h5>
                  <p className="text-muted">Efficiently manage and track all orders in real-time</p>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-4">
                  <FaCheckCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h5>Inventory Tracking</h5>
                  <p className="text-muted">Advanced inventory management system</p>
                </div>
              </div>
              <Button variant="primary" size="lg" className="mt-4">
                Learn More <FaArrowRight className="ms-2" />
              </Button>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0" data-aos="fade-left">
              <img src="https://images.pexels.com/photos/3228690/pexels-photo-3228690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Services" className="img-fluid rounded-lg shadow-lg" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center" data-aos="fade-up">
              <h2 className="display-5 fw-bold mb-4">Get in Touch</h2>
              <p className="lead text-muted mb-5">We'd love to hear from you</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="border-0 shadow-lg" data-aos="fade-up">
                <Card.Body className="p-5">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Control 
                            type="text" 
                            placeholder="Your Name"
                            className="py-3"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Control 
                            type="email" 
                            placeholder="Your Email"
                            className="py-3"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-4">
                      <Form.Control 
                        as="textarea" 
                        rows={4} 
                        placeholder="Your Message"
                        className="py-3"
                      />
                    </Form.Group>
                    <Button variant="primary" size="lg" className="w-100">
                      Send Message <FaEnvelope className="ms-2" />
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="text-center">
            {[
              { number: "1000+", label: "Happy Clients" },
              { number: "50+", label: "Team Members" },
              { number: "24/7", label: "Support Available" },
              { number: "99%", label: "Success Rate" }
            ].map((stat, index) => (
              <Col md={3} key={index} className="mb-4 mb-md-0" data-aos="fade-up" data-aos-delay={index * 100}>
                <h2 className="display-4 fw-bold mb-2">{stat.number}</h2>
                <p className="mb-0 text-white-50">{stat.label}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        .hover-lift {
          transition: transform 0.2s ease-in-out;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        .rounded-lg {
          border-radius: 1rem;
        }
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        body, html {
          overflow-x: hidden;
        }
        .container-fluid {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </>
  );
};

export default Home;