import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // Simulate fetching data from a database
  const books = [
    {
      id: 1,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      completed: false,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      completed: true,
    },
    { id: 3, title: "1984", author: "George Orwell", completed: false },
  ];

  res.json(books);
});

// router.post("/new");

export default router;
