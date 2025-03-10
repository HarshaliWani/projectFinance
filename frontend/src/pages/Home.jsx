import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { 
  FaLock, 
  FaChartLine, 
  FaLightbulb, 
  FaArrowRight, 
  FaCreditCard, 
  FaRegCalendarAlt, 
  FaShieldAlt, 
  FaMobileAlt, 
  FaStar 
} from "react-icons/fa";

// Custom Hook for scroll animation - will add a fade-in effect as user scrolls
const useScrollAnimation = () => {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeIn');
          entry.target.style.opacity = 1;
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.scroll-animation');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

const Testimonial = ({ image, name, text, role }) => (
  <Card className="testimonial-card border-0 shadow-sm h-100 p-4">
    <div className="d-flex align-items-center mb-3">
      <img 
        src={image} 
        alt={name} 
        className="rounded-circle me-3"
        width="60" 
        height="60" 
      />
      <div>
        <h5 className="mb-0">{name}</h5>
        <p className="text-muted mb-0">{role}</p>
      </div>
    </div>
    <p className="fs-6 fst-italic mb-3">"{text}"</p>
    <div className="text-warning">
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
    </div>
  </Card>
);

const FeatureCard = ({ icon, title, description, color }) => (
  <Card className="feature-card h-100 border-0 shadow-sm p-4 scroll-animation" style={{ opacity: 0 }}>
    <div className={`feature-icon-wrapper rounded-circle mb-4 d-flex align-items-center justify-content-center`} 
         style={{ background: color, width: "70px", height: "70px" }}>
      {icon}
    </div>
    <Card.Title className="mb-3">{title}</Card.Title>
    <Card.Text className="text-muted">{description}</Card.Text>
  </Card>
);

const Home = () => {
  useScrollAnimation();

  return (
    <div className="landing-page">
      
      {/* Hero Section - Modern and Clean */}
      <section className="hero-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <span className="badge bg-primary-subtle text-primary mb-3 rounded-pill px-3 py-2">Personal Finance Made Simple</span>
                <h1 className="display-4 fw-bold mb-3">Take Control of Your Financial Future</h1>
                <p className="lead text-muted mb-4">Track expenses, create budgets, and reach your financial goals with our easy-to-use platform. Join thousands of users who've already changed their relationship with money.</p>
                <div className="d-flex flex-wrap gap-2">
                  <Link to={localStorage.getItem("user") ? "/dashboard" : "/login"} className="btn btn-primary btn-lg rounded-pill px-4 py-3">
                    Get Started <FaArrowRight className="ms-2" />
                  </Link>
                  <a href="#how-it-works" className="btn btn-outline-dark btn-lg rounded-pill px-4 py-3">
                    How It Works
                  </a>
                </div>
                <div className="d-flex align-items-center mt-4">
                  <div className="d-flex">
                    {["https://randomuser.me/api/portraits/women/44.jpg", 
                      "https://randomuser.me/api/portraits/men/32.jpg", 
                      "https://randomuser.me/api/portraits/women/68.jpg"].map((img, i) => (
                      <img 
                        key={i} 
                        src={img} 
                        alt="User" 
                        className="rounded-circle border border-3 border-white" 
                        width="40" 
                        height="40" 
                        style={{ marginLeft: i > 0 ? "-15px" : 0 }}
                      />
                    ))}
                  </div>
                  <div className="ms-3">
                    <div className="d-flex align-items-center">
                      <div className="text-warning me-2">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <span className="fw-bold">4.9/5</span>
                    </div>
                    <p className="text-muted mb-0 small">From 2,000+ reviews</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="position-relative hero-container">
                <div className="hero-image-container rounded-4 overflow-hidden shadow-lg">
                  <img 
                    src="https://img.freepik.com/free-vector/gradient-stock-market-concept_23-2149166910.jpg" 
                    alt="Finance Management Dashboard" 
                    className="img-fluid w-100"
                  />
                </div>
                
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5 bg-light">
        <Container>
          <Row className="text-center">
            {[
              { number: "40,000+", label: "Active Users" },
              { number: "12.5M", label: "Money Saved" },
              { number: "98%", label: "Customer Satisfaction" },
              { number: "200+", label: "Financial Institutions" }
            ].map((stat, i) => (
              <Col md={3} sm={6} className="mb-4 mb-md-0" key={i}>
                <div className="py-4">
                  <h2 className="display-5 fw-bold text-primary mb-1">{stat.number}</h2>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <Container>
          <div className="text-center mb-5">
            <span className="badge bg-primary-subtle text-primary mb-3 rounded-pill px-3 py-2">Powerful Features</span>
            <h2 className="display-5 fw-bold">Everything You Need For Financial Success</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Our platform provides all the tools and insights you need to take control of your finances.
            </p>
          </div>
          <Row className="g-4">
            {[
              {
                icon: <FaLock size={28} className="text-white" />,
                title: "Secure Account Connection",
                description: "Connect your bank accounts, credit cards, and investment accounts with bank-level security encryption.",
                color: "#4361ee"
              },
              {
                icon: <FaChartLine size={28} className="text-white" />,
                title: "Expense Tracking",
                description: "Automatically categorize your transactions and see where your money is going in real-time.",
                color: "#3a0ca3"
              },
              {
                icon: <FaLightbulb size={28} className="text-white" />,
                title: "Smart Budgeting",
                description: "Create customized budgets based on your spending habits and get alerts when you're close to limits.",
                color: "#7209b7"
              },
              {
                icon: <FaRegCalendarAlt size={28} className="text-white" />,
                title: "Bill Reminders",
                description: "Never miss a payment again with automated bill tracking and due date notifications.",
                color: "#f72585"
              },
              {
                icon: <FaShieldAlt size={28} className="text-white" />,
                title: "Data Protection",
                description: "Your financial data is protected with 256-bit encryption and never shared with third parties.",
                color: "#4cc9f0"
              },
              {
                icon: <FaMobileAlt size={28} className="text-white" />,
                title: "Mobile Access",
                description: "Access your financial information anytime, anywhere with our responsive web application.",
                color: "#4895ef"
              }
            ].map((feature, i) => (
              <Col lg={4} md={6} key={i}>
                <FeatureCard {...feature} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={5} className="mb-5 mb-lg-0">
              <span className="badge bg-primary-subtle text-primary mb-3 rounded-pill px-3 py-2">Simple Process</span>
              <h2 className="display-5 fw-bold mb-4">How It Works</h2>
              <p className="lead text-muted mb-4">Getting started is easy. In just a few minutes, you'll have a complete view of your finances.</p>
              
              <div className="process-steps">
                {[
                  {
                    step: 1,
                    title: "Create your account",
                    description: "Sign up in less than 2 minutes with just your email address."
                  },
                  {
                    step: 2,
                    title: "Connect your accounts",
                    description: "Securely link your financial accounts to get a complete picture."
                  },
                  {
                    step: 3,
                    title: "Set up your goals",
                    description: "Define what you want to achieve with your money."
                  },
                  {
                    step: 4,
                    title: "Track your progress",
                    description: "Monitor your spending, savings, and get personalized insights."
                  }
                ].map((process, i) => (
                  <div className="d-flex mb-4 scroll-animation" style={{ opacity: 0 }} key={i}>
                    <div className="process-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                         style={{ width: "50px", height: "50px" }}>
                      {process.step}
                    </div>
                    <div>
                      <h5 className="mb-1">{process.title}</h5>
                      <p className="text-muted mb-0">{process.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link to="/signup" className="btn btn-primary rounded-pill px-4 py-3 mt-3">
                Get Started Now <FaArrowRight className="ms-2" />
              </Link>
            </Col>
            <Col lg={6} className="offset-lg-1">
              <div className="position-relative rounded-4 overflow-hidden shadow-lg">
                <img 
                  src="https://img.freepik.com/free-vector/finance-financial-performance-concept-illustration_53876-40450.jpg" 
                  alt="How it works" 
                  className="img-fluid w-100"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-5">
        <Container>
          <div className="text-center mb-5">
            <span className="badge bg-primary-subtle text-primary mb-3 rounded-pill px-3 py-2">Success Stories</span>
            <h2 className="display-5 fw-bold">What Our Users Say</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Join thousands of satisfied users who have transformed their financial lives.
            </p>
          </div>
          <Row className="g-4">
            {[
              {
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                name: "Sarah Johnson",
                role: "Small Business Owner",
                text: "FinanceMaster has transformed how I manage both my personal and business finances. The insights have helped me save over 25,000 in just six months!"
              },
              {
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                name: "Michael Chen",
                role: "Software Engineer",
                text: "I used to struggle keeping track of my expenses across multiple accounts. Now everything is in one place, and I finally reached my goal of buying my first home."
              },
              {
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                name: "Emma Rodriguez",
                role: "Marketing Manager",
                text: "The budgeting features are game-changing. I can finally see where my money goes each month and make adjustments to reach my financial goals faster."
              }
            ].map((testimonial, i) => (
              <Col lg={4} key={i} className="scroll-animation" style={{ opacity: 0 }}>
                <Testimonial {...testimonial} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section  */}
      <section className="py-5 bg-primary text-white text-center">
        <Container className="py-4">
          <h2 className="display-5 fw-bold mb-3">Ready to Transform Your Finances?</h2>
          <p className="lead mb-4">Join thousands of users who've already taken control of their financial future.</p>
          <Button 
            as={Link} 
            to={localStorage.getItem("user") ? "/dashboard" : "/login"}
            variant="light" 
            size="lg" 
            className="rounded-pill px-5 py-3 text-primary fw-bold">
            Get Started 
          </Button>
        </Container>
      </section>

      {/* Footer commented out in original code */}
      {/* <footer className="py-5 bg-dark text-white">...</footer> */}

      {/* CSS to add to your global styles */}
      <style jsx>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
        
        .feature-card:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        
        .hover-text-white:hover {
          color: white !important;
          transition: color 0.3s ease;
        }
        
        .process-icon {
          font-weight: bold;
        }
        
        .hero-container {
          height: 100%;
          margin-bottom: 2rem;
        }
        
        .hero-image-container {
          position: relative;
          z-index: 1;
        }
        
        .hero-image-container::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(67, 97, 238, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
          top: 0;
          left: 0;
          z-index: 0;
        }
        
        .floating-card {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
          z-index: 3;
          transition: transform 0.3s ease;
        }
        
        .floating-card:hover {
          transform: translateY(-5px);
        }
        
        @media (max-width: 991px) {
          .floating-card-top {
            top: 5% !important;
            right: 0 !important;
          }
          
          .floating-card-bottom {
            bottom: 10% !important;
            left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;