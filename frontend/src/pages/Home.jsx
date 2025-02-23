import { Link } from "react-router-dom";
import { FaLock, FaChartLine, FaLightbulb } from "react-icons/fa"; // Importing icons
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-left p-5  position-relative " style={{ height: "8cm" }}>
        <div className="container">
          <h1>Take Control of Your Finances.</h1>
          <p className="fs-4 fw-normal">Track, Budget, and Save Effortlessly!</p>
          <Link to={localStorage.getItem("user") ? "/dashboard" : "/login"} className="btn btn-primary mt-3">
            Get Started Now →
          </Link>

        </div>



        {/* Small Testimonial Card */}
        <div className="testimonial-card position-absolute top-0 end-0 m-4 p-3 bg-white shadow rounded">

          {/* User Info (Image & Name on the same line) */}
          <div className="d-flex align-items-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <strong>@financeguru</strong>
          </div>

          {/* Force the text to the next row */}
          <div className="d-block w-100 mt-2">
            <p className="mb-0 small" style={{ lineHeight: "1.2" }}>
              "Best to manage finances! <br />
              I saved a lot using it and <br />
              finally reached my dream savings."
            </p>
          </div>

        </div>

      </section >

      {/* Image Section with Overlay */}
      < section className="image-section position-relative mb-4" style={{ overflow: "hidden", height: "6cm" }}>
        <img
          src="https://staging.herovired.com/wp-content/uploads/2023/03/Finance-Manager-Salary-in-India-in-2023.webp"
          alt="We are Here For You"
          className="img-fluid w-100"
          style={{ objectFit: "cover", height: "100%" }}
        />
        <div className="overlay-text position-absolute top-50 start-0 translate-middle-y text-white ps-4" style={{ background: "none" }} >
          <h3 className="mb-0">We are</h3>
          <h3 className="mb-0">Here for you</h3>
        </div>
      </section >


      {/* Features Section */}
      < section className="features-section text-center p-5 text-black mb-4 " >
        <div className="container">
          <h2>How it works</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card p-3 custom-color text-white">
                <FaLock size={40} className="mb-2" /> {/* Icon */}
                <h4>Connect Your Accounts</h4>
                <p>Securely link and manage all your finances.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 custom-color text-white">
                <FaChartLine size={40} className="mb-2" /> {/* Icon */}
                <h4>Track & Manage</h4>
                <p>Categorize expenses and set budgets.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 custom-color text-white">
                <FaLightbulb size={40} className="mb-2" /> {/* Icon */}
                <h4>Gain Insights</h4>
                <p>View spending trends and get financial advice.</p>
              </div>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
};

export default Home;




