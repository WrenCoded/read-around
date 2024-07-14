import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    //if the user has already signed up with that email, tell them they are already in the DB
    if (user) {
      res.status(401).json({
        success: false,
        message: "User already exists",
      });
    } else {
      try {
        const hashedPassword = await argon2.hash(req.body.password);
        const newUser = await prisma.user.create({
          data: {
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
          },
        });
        if (newUser) {
          const token = jwt.sign(
            {
              user: {
                id: newUser.id,
                email: newUser.email,
              },
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
          );
          res.status(201).json({
            success: true,
            token,
          });
        } else {
          res.status(500).json({
            success: false,
            message: "Something went wrong",
          });
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
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
            email: foundUser.email,
            id: foundUser.id,
          },
          process.env.SECRET_KEY
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
      });
    }
  } catch (e) {
    response.status(401).json({
      success: false,
      message: "Wrong username or password",
    });
  }
});

export default router;
