const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

const signUpSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string(),
});
router.post("/signup", async (req, res) => {
  try {
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

    if (user) {
      return res.json({
        message: "User already exists",
      });
    }

    const dbUser = await User.create(body);
    const userId = dbUser._id;

    await Account.create({
      userId,
      balance: 1 + Math.floor(Math.random() * 10000),
    });
    res.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "Error occured in sign in" });
  }
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
  const user = await User.findOne({ username: body.username });
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

// add debouncing
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
