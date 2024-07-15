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

// Get all books for authenticated user
router.get("/", authenticateToken, async (req, res) => {
  try {
    console.log("Authenticated user ID:", req.user.id);
    const books = await prisma.book.findMany({
      where: {
        ownerId: req.user.id,
      },
    });
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { title, author } = req.body;
  console.log("Request body:", req.body);
  console.log("Authenticated user:", req.user);

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

export default router;
router.post("/", authenticateToken, async (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res
      .status(400)
      .json({ success: false, message: "Title and author are required" });
  }

  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        ownerId: req.user.id, // Set ownerId directly
      },
    });
    res.status(201).json({ success: true, book: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
});
