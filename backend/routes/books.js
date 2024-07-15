import express from "express";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";

const router = express.Router();

// Middleware to check if user is authenticated
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware to check if the authenticated user is the owner of the book
const checkBookOwner = async (req, res, next) => {
  const bookId = req.params.id;
  console.log("Book owner id", req.user.user.id);
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book || book.ownerId !== req.user.user.id) {
      return res.status(404).json({ message: 'Book not found or not authorized' });
    }

    next();
  } catch (error) {
    console.error('Error checking book owner:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Get all books for authenticated user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        ownerId: req.user.user.id,
      },
    });
    res.status(200).json(books);
    console.log('get /books route complete');
  } catch (error) {
    console.error("Error fetching books:", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
});

// add a new book to authenticated users books
router.post("/", authenticateToken, async (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res
      .status(400)
      .json({ success: false, message: "Title and author are required" });
  }

  try {
    console.log("Creating new book for user ID:", req.user.user.id);
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        ownerId: req.user.user.id,
      },
    });
    res.status(201).json({ success: true, book: newBook });
  } catch (error) {
    console.error("(Backend) Error creating book:", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
});




// Delete a book for the authenticated user
router.delete('/:id', authenticateToken, checkBookOwner, async (req, res) => {
  const bookId = req.params.id;

  console.log('deleting bookId:', bookId);

  try {
    await prisma.book.delete({
      where: { id: bookId },
    });

    console.log('Book deleted:', bookId);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
});



router.put(
  "/books/:id",
  authenticateToken,
  checkBookOwner,
  async (req, res) => {
    const bookId = req.params.id;
    const updatedData = req.body; // Get the updated data from the request body

    try {
      const updatedBook = await prisma.book.update({
        where: { id: bookId },
        data: updatedData,
      });
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error("Error updating book:", error);
      res
        .status(500)
        .json({ message: "Error updating book", error: error.message });
    }
  }
);

export default router;