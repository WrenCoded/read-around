import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    // Check if user already exists
    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await argon2.hash(req.body.password);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username,
      },
    });

    // Generate a JWT token
    const token = jwt.sign(
      {
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.post("/login", async (request, response) => {
  try {
    const foundUser = await prisma.user.findFirstOrThrow({
      where: {
        email: request.body.email,
      },
    });

    try {
      const verifiedPassword = await argon2.verify(
        foundUser.password,
        request.body.password
      );

      if (verifiedPassword) {
        const token = jwt.sign(
          {
            user: {
              email: foundUser.email,
              id: foundUser.id,
              username: foundUser.username, 
            },
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );

        response.status(200).json({
          success: true,
          token,
        });
      } else {
        response.status(401).json({
          success: false,
          message: "Wrong username or password",
        });
      }
    } catch (e) {
      response.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message,
      });
    }
  } catch (e) {
    response.status(401).json({
      success: false,
      message: "Wrong username or password",
      error: err.message,
    });
  }
});


const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded.user; // Attach user info to request
    next();
  });
};
router.get("/user-profile", authenticate, async (req, res) => {
  console.log("get user profile route called");
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        books: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});


export default router;

