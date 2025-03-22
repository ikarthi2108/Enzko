import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import NavigationBar from "./NavigationBar";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      <NavigationBar />
      <div style={{ backgroundColor: "#E6EEF8", minHeight: "100vh" }}>
        {/* Hero Section */}
        <div
          className="hero-section text-white py-5"
          style={{ backgroundColor: "#1a365d" }}
        >
          <div className="container py-5">
            <div className="row align-items-center">
              <div className="col-lg-6" data-aos="fade-right">
                <h1 className="display-4 fw-bold mb-4">Welcome to Our Store</h1>
                <p className="lead mb-4">
                  We specialize in providing high-quality clothing with a focus
                  on customer satisfaction and sustainable fashion.
                </p>
                <button className="btn btn-light btn-lg">Learn More</button>
              </div>
              <div className="col-lg-6" data-aos="fade-left">
                <img
                  src="https://images.pexels.com/photos/3228685/pexels-photo-3228685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Store front"
                  className="img-fluid rounded shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-4" data-aos="fade-up">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i
                      className="bi bi-truck text-primary"
                      style={{ fontSize: "2.5rem" }}
                    ></i>
                  </div>
                  <h3 className="h4 mb-3">Fast Delivery</h3>
                  <p className="text-muted mb-0">
                    We ensure quick and reliable delivery to all locations with
                    real-time tracking.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i
                      className="bi bi-shield-check text-primary"
                      style={{ fontSize: "2.5rem" }}
                    ></i>
                  </div>
                  <h3 className="h4 mb-3">Quality Assurance</h3>
                  <p className="text-muted mb-0">
                    Every product undergoes strict quality checks before
                    reaching our customers.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i
                      className="bi bi-headset text-primary"
                      style={{ fontSize: "2.5rem" }}
                    ></i>
                  </div>
                  <h3 className="h4 mb-3">24/7 Support</h3>
                  <p className="text-muted mb-0">
                    Our customer support team is always ready to assist you with
                    any queries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
              <img
                src="https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="About us"
                className="img-fluid rounded shadow-lg"
              />
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <h2 className="display-5 mb-4">Our Story</h2>
              <p className="lead text-muted mb-4">
                Started in 2020, we've grown from a small local shop to a
                nationwide brand trusted by thousands of customers.
              </p>
              <div className="row g-4 mb-4">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <i
                      className="bi bi-people text-primary me-2"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                    <div>
                      <h4 className="mb-0">10K+</h4>
                      <p className="text-muted mb-0">Happy Customers</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <i
                      className="bi bi-shop text-primary me-2"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                    <div>
                      <h4 className="mb-0">50+</h4>
                      <p className="text-muted mb-0">Store Locations</p>
                    </div>
                  </div>
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
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
          }

          .hero-section {
            background: linear-gradient(135deg, #1a365d 0%, #2563eb 100%);
          }

          .feature-icon {
            background-color: rgba(37, 99, 235, 0.1);
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
          }

          .social-links a {
            text-decoration: none;
            font-size: 1.2rem;
            transition: color 0.3s ease;
          }

          .social-links a:hover {
            color: #0d6efd !important;
          }
        `}</style>
      </div>
    </>
  );
};

export default About;
