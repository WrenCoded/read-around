import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../AuthContext";

const BASE_URL = "http://localhost:8080";

export default function SignupPage() {
  const { isLoggedIn, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user-profile"); 
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${BASE_URL}/auth/signup`, {
        email,
        password,
        username
      });
      login(result.data.token); // Assuming the token is returned upon signup
      navigate("/user-profile"); // Redirect to user profile
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter username"
          />
        </Form.Group>
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
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </>
  );
}
