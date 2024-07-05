

const mysql = require("mysql2");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const bcrypt = require("bcrypt");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jashan@04",
  database: "bookstore"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));


connection.connect(function (error) {
  if (error) {
    console.error("Database connection failed: ", error);
    return;
  }
  console.log("Connected to the database.");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    function (error, results) {
      if (error) {
        console.error("Error during login query: ", error);
        res.json({ success: false, message: "Error during login, please try again" });
        return;
      }
      if (results.length === 0) {
        res.json({ success: false, message: "Email not found. You have to sign up" });
        return;
      }
      const user = results[0];
      if (user.pass !== password) {
        res.json({ success: false, message: "Incorrect password. Please enter the correct password" });
        return;
      }
      res.json({ success: true });
    }
  );
});

app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const query = 'INSERT INTO users (email, pass) VALUES (?, ?)';
  connection.execute(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error during user insert query:', err);
      return res.status(500).json({ success: false, message: 'Error occurred, please try again later' });
    }

    res.json({ success: true });
  });
});





app.get("/index", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/signup", function (req, res) {
  res.sendFile(path.join(__dirname, "SignUp.html"));
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
