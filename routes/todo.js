const express = require("express");

//Creates a new instance of a router
const router = express.Router();

// Implement getting all todos here
router.get("/");

// Implement creating a new todo here
router.post("/new");

export default router;
