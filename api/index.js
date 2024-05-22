const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const salt = bcrypt.genSaltSync(10);
const secret = "asdfadsf4w0543ew0fs[84354sdf8g0sd434#$$";

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the origin of your React app
    credentials: true, // Allow the server to send cookies to the client
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the mongo database!");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc ? "User created successfully" : "User creation error");
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  if (!userDoc) {
    return res.status(400).json("Invalid username or password");
  }

  const validPassword = bcrypt.compareSync(password, userDoc.password);

  if (!validPassword) {
    return res.status(400).json("Invalid username or password");
  }

  // Logged in
  jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
    if (err) throw err;
    res.json(token);
  });
});
const port = 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
