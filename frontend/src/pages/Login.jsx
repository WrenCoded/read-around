import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../AuthContext";

const BASE_URL = "http://localhost:8080";

export default function LoginPage() {
  const { isLoggedIn, isLoading, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/auth/login`, { email, password })
      .then((result) => {
        login(result.data.token); // Call the login function from AuthContext
        navigate("/user-profile");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        {/* submit button */}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      {/* display success message */}
      {isLoggedIn ? (
        <p className="text-success">You Are Logged in Successfully</p>
      ) : (
        <p className="text-danger">You Are Not Logged in</p>
      )}
    </>
  );
}
