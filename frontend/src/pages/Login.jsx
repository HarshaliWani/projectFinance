import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === values.email && user.password === values.password);

    if (user) {
      localStorage.setItem("user", JSON.stringify({ email: values.email }));
      toast.success("Login successful! Redirecting...", toastOptions);
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      toast.error("No such user! Please sign up.", toastOptions);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === values.email);

    if (userExists) {
      toast.error("User already exists! Please log in.", toastOptions);
    } else {
      users.push({ email: values.email, password: values.password });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify({ email: values.email }));
      toast.success("Sign up successful! Redirecting...", toastOptions);
      setTimeout(() => navigate("/dashboard"), 2000);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container className="p-4 shadow-lg rounded bg-white" style={{ maxWidth: "450px" }}>
        <Row>
          <Col>
            <h1 className="text-center mb-4">
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "#007bff" }} />
            </h1>
            <h2 className="text-center">Login / Sign Up</h2>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} value={values.email} required />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} value={values.password} required />
              </Form.Group>
              
              {/* Two buttons in the same row */}
              <Row className="mt-4 text-center">
                <Col>
                  <Button className="w-100" variant="outline-primary" onClick={handleSignUp}>
                    Sign Up
                  </Button>
                </Col>
                <Col>
                  <Button className="w-100" variant="primary" onClick={handleLogin}>
                    Login
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
