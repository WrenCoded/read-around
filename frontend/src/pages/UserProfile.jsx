import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { Button, Modal, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import AddBookForm from "../components/AddBookForm";
import BookCard from "../components/BookCard.jsx";
import EditBookForm from "../components/EditBookForm";
import { fetchUserProfile, refreshBooks, deleteBook, updateBook } from "./helpers";




const UserProfile = () => {
  const { userToken, getUserId, username } = useContext(AuthContext);
  const userId = getUserId(userToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const [showAddBookModal, setShowAddBookModal] = useState(false);
const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [isBookAdded, setIsBookAdded] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null)

const handleClose = () => {
  setShowAddBookModal(false);
  setShowEditBookModal(false);
};
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


  const handleRefreshBooks = () => {
    setIsBookAdded(false);
    refreshBooks(userToken, setUser);
  };

const handleUpdateBooks = async (bookId, updatedBookData) => {
  console.log("Updating book:", updatedBookData);
  console.log("Using token:", userToken);
  try {
    await updateBook(userToken, bookId, updatedBookData);
    setUser((prevUser) => ({
      ...prevUser,
      books: prevUser.books.map((book) =>
        book.id === bookId ? updatedBookData : book
      ),
    }));
  } catch (error) {
    console.error("Error updating book:", error.response);
  }
};
  const handleShowAddBookModal = () => {
    setShowAddBookModal(true);
  };

  const handleShowEditBookModal = (book) => {
    setSelectedBook(book);
    setShowEditBookModal(true);
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
              <Button variant="primary" onClick={handleShowAddBookModal}>
                Add Book
              </Button>
            </div>

            <Row className="books-grid">
              {user.books.map((book) => (
                <Col md={4} key={book.id}>
                  <div className="book-card">
                    <BookCard
                      book={book}
                      handleDelete={handleDelete}
                      userToken={userToken}
                      handleShowEditBookModal={handleShowEditBookModal} 
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>

      {/* Modal for Adding a Book */}
      <Modal show={showAddBookModal} onHide={handleClose}>
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

      {/* Modal for updating a Book */}
      <Modal show={showEditBookModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook && (
            <EditBookForm
              book={selectedBook}
              handleUpdateBook={handleUpdateBooks}
              handleClose={handleClose}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};





export default UserProfile;
