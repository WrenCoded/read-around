import { useState } from "react";
import axios from "axios";
import { Form, Button} from "react-bootstrap"

const BASE_URL = "http://localhost:8080";

export default function SignupPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState("false");
  const [userExists, setUserExists] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/auth/signup`, {
        email,
        password,
      })
      .then((result) => {
        setRegistered(true)
        const userToken = "userToken";
        localStorage.setItem(userToken, result.data.token);
        const token = localStorage.getItem(userToken);
        if (token) {
    
          console.log(result.data);
        } else {
          throw new Error("Failed to store token.");
        }
      })
      .catch((err) =>{
         if (err.response && err.response.status === 401) {
           console.error("User already exists");
           setRegistered(false)
           setUserExists(true)
         } else {
           console.error("Something went wrong");
         }
      })

  };

  return (
    <>
      <h1>Sign up</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
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

        {/* password */}
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
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Sign up
        </Button>
      </Form>
      {/* display success message */}
      {registered === true ? (
        <p className="text-success">You Are Registered Successfully</p>
      ) : userExists === true ? (
        <p className="text-danger">User Already Exists</p>
      ) : null}
      {/* display default error message */}
      {registered === false && userExists === false && (
        <p className="text-danger">Something went wrong</p>
      )}
    </>
  );
};


