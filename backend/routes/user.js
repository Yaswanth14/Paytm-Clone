const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();
const { User } = require("../db");
const { authMiddleware } = require("../middleware");

const signUpSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string(),
});
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.json({
      message: "User already exists",
    });
  }

  const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    process.env.JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});
router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signInSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Incorrect inputs",
    });
  }
  const user = User.findOne({ username: body.username });
  if (!user._id) {
    return res.json({
      message: "User doesn't exist!",
    });
  }
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET
  );

  res.json({
    message: "Logged in successfully",
    token: token,
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional,
  lastName: zod.string().optional(),
});
router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.json.send({
      message: "Error while updating information",
    });
  }

  await User.updateOne(req.body, { _id: req.userId });

  res.json({ message: "Updated succesfully" });
});

module.exports = router;
