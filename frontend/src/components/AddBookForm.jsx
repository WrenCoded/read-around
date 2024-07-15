import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../AuthContext";

export default function AddBookForm({ refreshBooks, handleClose }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const { userToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/books",
        { title, author },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("Book added");
      setTitle("");
      setAuthor("");
      refreshBooks(); // Refresh the book list
      handleClose(); // Close the modal
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  return (
    <>
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
