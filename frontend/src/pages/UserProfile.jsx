import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { Outlet } from "react-router-dom";
import AddBookForm from "../components/AddBookForm";

const UserProfile = () => {
  const { userToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // for book modal form
    const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/auth/user-profile",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setUser(response.data);
        console.log("User profile fetched:", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchUserProfile();
    
    }
  }, [userToken]);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>No user data available</p>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <Button variant="primary" onClick={handleShow}>
        Add Book
      </Button>
      <div>
        <h2>My Books</h2>
        <ul>
          {user.books.map((book) => {
            return (
              <li key={book.id}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddBookForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserProfile;
