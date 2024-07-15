import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Button, Modal, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import AddBookForm from "../components/AddBookForm";
import BookCard from "../components/BookCard.jsx";
import { fetchUserProfile, refreshBooks, deleteBook } from "./helpers";




const UserProfile = () => {
  const { userToken, getUserId, username } = useContext(AuthContext);
  const userId = getUserId(userToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [isBookAdded, setIsBookAdded] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   const fetchUserProfileData = async (token) => {
     try {
       const userData = await fetchUserProfile(token);
       setUser(userData);
     } catch (error) {
       console.error("Error fetching user profile data:", error.response);
     } finally {
       setLoading(false);
     }
   };

  useEffect(() => {
    fetchUserProfileData(userToken);
    refreshBooks(userToken, setUser);
  }, [userToken]);


const handleDelete = async (userToken, bookId) => {
  console.log("Deleting book with ID:", bookId);
  console.log("Using token:", userToken);

  try {
    await deleteBook(userToken, bookId);
    setUser((prevUser) => ({
      ...prevUser,
      books: prevUser.books.filter((book) => book.id !== bookId),
    }));
  } catch (error) {
    console.error("Error deleting book:", error.response);
  }
};



   const handleAddBook = () => {
     setIsBookAdded(true);
   };

   const handleRefreshBooks = () => {
     setIsBookAdded(false);
     refreshBooks(userToken, setUser);
   };


const handleDelete = async (userToken, bookId) => {
  console.log("Deleting book with ID:", bookId);
  console.log("Using token:", userToken);

  try {
    await deleteBook(userToken, bookId);
    setUser((prevUser) => ({
      ...prevUser,
      books: prevUser.books.filter((book) => book.id !== bookId),
    }));
  } catch (error) {
    console.error("Error deleting book:", error.response);
  }
};



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
          <AddBookForm
            refreshBooks={handleRefreshBooks}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};





export default UserProfile;
