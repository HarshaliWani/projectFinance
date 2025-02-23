import { Link } from "react-router-dom";
import { FaLock, FaChartLine, FaLightbulb } from "react-icons/fa"; // Importing icons

const Home = () => {
    return (
        <div>
          {/* Hero Section */}
          <section className="hero-section text-left p-5 bg-light position-relative">
            <div className="container">
              <h1>Take Control of Your Finances.</h1>
              <p className="lead">Track, Budget, and Save Effortlessly!</p>
              <Link to="/home" className="btn btn-primary mt-3">
                Get Started Now →
              </Link>
            </div>
    
            {/* Small Testimonial Card */}
            <div className="testimonial-card position-absolute top-0 end-0 m-4 p-3 bg-white shadow rounded">
              <div className="d-flex align-items-left">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="User"
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                />
                <div>
                  <strong>@financeguru</strong>
                  <p className="mb-0 small">"Best app to manage finances!"</p>
                </div>
              </div>
            </div>
          </section>
    
          {/* Image Section with Overlay */}
          <section className="image-section position-relative">
            <img
              src="F:\Edunet GDS MERN\projectFinance1\frontend\src\assets\home.jpg"
              alt="We are Here For You"
              className="img-fluid w-100"
            />
            <div className="overlay-text position-absolute top-50 start-50 translate-middle text-white">
              <h2>We are Here For You.</h2>
            </div>
          </section>
    
          {/* Features Section */}
          <section className="features-section text-center p-5 bg-primary text-white">
            <div className="container">
              <h2>How it works</h2>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card p-3 bg-dark text-white">
                    <FaLock size={40} className="mb-2" /> {/* Icon */}
                    <h4>Connect Your Accounts</h4>
                    <p>Securely link and manage all your finances.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 bg-dark text-white">
                    <FaChartLine size={40} className="mb-2" /> {/* Icon */}
                    <h4>Track & Manage</h4>
                    <p>Categorize expenses and set budgets.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 bg-dark text-white">
                    <FaLightbulb size={40} className="mb-2" /> {/* Icon */}
                    <h4>Gain Insights</h4>
                    <p>View spending trends and get financial advice.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
  };
  
  export default Home;




  