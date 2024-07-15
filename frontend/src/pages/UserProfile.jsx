import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import AddBookForm from "../components/AddBookForm";

const UserProfile = () => {
  const { userToken, getUserId } = useContext(AuthContext);
  const userId = getUserId(userToken)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const refreshBooks = async () => {
    if (userToken) {
      const response = await axios.get("http://localhost:8080/books", 
      // { title, author, ownerId: userId },
        {headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUser((prevUser) => ({ ...prevUser, books: response.data }));
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchUserProfile();
      refreshBooks(); // Fetch user's books on component mount
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
          {user.books.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </li>
          ))}
        </ul>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddBookForm refreshBooks={refreshBooks} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserProfile;
