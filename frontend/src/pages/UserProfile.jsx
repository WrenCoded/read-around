import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Button, Modal, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import AddBookForm from "../components/AddBookForm";
import BookCard from "../components/BookCard.jsx";




const UserProfile = () => {
  const { userToken, getUserId, username } = useContext(AuthContext);
  const userId = getUserId(userToken);
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
      const response = await axios.get(
        "http://localhost:8080/books",

        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
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
    <Container>
      <div className="profile-grid">
        {/* Welcome Message and User Info */}
        <Row className="d-flex align-items-center">
          <Col md={6} className="text-center">
            <h1>Welcome to your profile, {username}</h1>
          </Col>
          <Col md={6} className="text-end">
            <div className="m-3">
              <h5>Email: {user.email}</h5>
              <h6>Username: {user.username}</h6>
            </div>
          </Col>
        </Row>

        {/* Books Section */}
        <Row className="mt-4">
          <Col md={12}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="mb-0">Your Books</h2>
              <Button variant="primary" onClick={handleShow}>
                Add Book
              </Button>
            </div>

            <Row className="books-grid">
              {user.books.map((book) => (
                <Col md={4} key={book.id}>
                  <div className="book-card">
                    <BookCard book={book} />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>

      {/* Modal for Adding a Book */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddBookForm refreshBooks={refreshBooks} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};





export default UserProfile;
