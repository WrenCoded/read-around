import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../AuthContext";

export default function AddBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const { userToken, getUserId } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", { title, author });
    console.log("Using token:", userToken);

    const userId = getUserId(userToken);

    try {
      const response = await axios.post(
        "http://localhost:8080/books",
        { title, author, owner: userId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Book added:", response.data);
      setTitle("");
      setAuthor("");
    } catch (err) {
      console.error("Error adding book:", err);
      console.error(
        "Error details:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <>
      <h1>Add a Book</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBookTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBookAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Book
        </Button>
      </Form>
    </>
  );
}
