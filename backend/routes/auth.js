import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import prisma from "../db/index.js";

const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    //find
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
      // throw new Error("User already exists");
    } else {
      try {
        //hash password
        const hashedPassword = await argon2.hash(req.body.password);

        //create new user in db
        const newUser = await prisma.user.create({
          data: {
            email: req.body.email,
            password: hashedPassword,
          },
        });
        if (newUser) {
          res.status(201).json({
            success: true,
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


router.post("/login", async (req, res) => {
  try {
    const foundUser = await prisma.user.findFirstOrThrow({
      //find the user in the db whose email matches the one the typed into the login form
      where: {
        email: req.body.email,
      },
    });
    try {
      const verifiedPassword = await argon2.verify(
        foundUser.password,
        req.body.password
      );
      const token = jwt.sign(
        {
          user: {
            email: foundUser.email,
            id: foundUser.id,
          },
        },
        "secretKey"
      );
      res.status(200).json({
        success: true,
        token,
      });
    } catch (err) {}
  } catch (err) {}
});



export default router;
