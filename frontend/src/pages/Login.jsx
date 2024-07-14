import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../AuthContext";

const BASE_URL = "http://localhost:8080";

export default function LoginPage() {
  const { isLoggedIn, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user-profile"); // Redirect to user profile if already logged in
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (result.data.success) {
      console.log(result)
      const token = result.data.token;
       login(token);
      localStorage.setItem("userToken", token); // Store the token in local storage
      navigate("/user-profile");
      } else {
       console.error("Login failed:", result.data.message);
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }const handleSubmit = (e) => {
      e.preventDefault();
      alert("Submited");
      axios
        .post(`localhost:8080/auth/signup`, {
          email,
          password,
        })
        .then((result) => {
          const userToken = "userToken";
          localStorage.setItem(userToken, result.data.token);
          const token = localStorage.getItem(userToken);
          if (token) {
            console.log(result.data.user);
            navigate("/app/user-profile");

            // Clear form fields after successful signup
            setEmail("");
            setPassword("");

            // Display success message
            alert("Signup successful!");

            // Redirect to the home page after signup
            history.push("/");

            // Clear local storage token after successful signup
            localStorage.removeItem(userToken);

            // Logout user if token is removed successfully
          } else {
            throw new Error("Failed to store token.");
          }
        })
        .catch((err) => console.error(err));
    };
  };

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </Form>
      {/* Display login status */}
      {isLoggedIn ? (
        <p className="text-success">You Are Logged in Successfully</p>
      ) : (
        <p className="text-danger">You Are Not Logged in</p>
      )}
    </>
  );
}
