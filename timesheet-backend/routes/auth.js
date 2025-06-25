// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { getConn } = require('../db');
const router = express.Router();

// Register
router.post('/register', (req, res) => {
  const { username, email, password, role = "employee", assigned_manager_id } = req.body;

  // 1. Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  const conn = getConn();

  // 2. Check if username or email already exists
  conn.execute({
    sqlText: "SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?",
    binds: [username, email],
    complete: function(err, stmt, rows) {
      if (err) {
        console.error("DB error during user existence check:", err);
        return res.status(500).json({ error: "Database error during user check" });
      }
      if (!rows || rows.length === 0) {
        return res.status(500).json({ error: "Unexpected database response" });
      }

      // Handle both COUNT and count (Snowflake may return either)
      const countValue = rows[0].COUNT !== undefined ? rows[0].COUNT : rows[0].count;

      if (countValue > 0) {
        return res.status(400).json({ error: "Username or Email already exists" });
      }

      // 3. Hash password and insert user
      const hashed = bcrypt.hashSync(password, 10);
      conn.execute({
        sqlText: "INSERT INTO users (username, email, password, role, assigned_manager_id) VALUES (?, ?, ?, ?, ?)",
        binds: [username, email, hashed, role, assigned_manager_id || null],
        complete: function(err) {
          if (err) {
            console.error("DB error during user creation:", err);
            return res.status(500).json({ error: "Failed to create user" });
          }
          res.status(201).json({ user: { username, email, role } });
        }
      });
    }
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const conn = getConn();
  conn.execute({
    sqlText: "SELECT * FROM users WHERE username = ?",
    binds: [username],
    complete: function(err, stmt, rows) {
      if (!rows || rows.length === 0) return res.status(400).json({ error: "Invalid credentials" });
      const user = rows[0];
      if (!bcrypt.compareSync(password, user.PASSWORD)) return res.status(400).json({ error: "Invalid credentials" });
      // Store user info in session
      req.session.user = {
        id: user.ID,
        username: user.USERNAME,
        email: user.EMAIL,
        role: user.ROLE,
        assigned_manager_id: user.ASSIGNED_MANAGER_ID
      };
      res.json({ message: "Logged in", user: req.session.user });
    }
  });
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) return res.status(400).json({ error: "Unable to log out" });
      res.clearCookie('connect.sid');
      res.json({ message: "Logout successful" });
    });
  } else {
    res.end();
  }
});

// User Info
const { isAuthenticated } = require('../middleware/auth');
router.get('/user', isAuthenticated, (req, res) => {
  const { username, email, role } = req.session.user;
  res.json({ username, email, role });
});

module.exports = router;
