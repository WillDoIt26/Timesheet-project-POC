const express = require('express');
const session = require('express-session');
require('dotenv').config();
const path = require('path');
const { connectSnowflake } = require('./db');
const cors = require('cors'); // Moved to top
const app = express();

// 1. CORS Middleware FIRST
app.use(cors({
  origin: 'http://localhost:4200', // Your Angular dev server
  credentials: true
}));

// 2. Other Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 60 * 60 * 1000,
    sameSite: 'none', // Add this for cross-site cookies
    secure: false     // Set to true in production with HTTPS
  }
}));

// 3. Serve Angular static files
const angularDistPath = path.join(__dirname, 'dist', 'my-angular-app', 'browser');
app.use(express.static(angularDistPath));

// 4. Routes
app.use('/', require('./routes/auth'));
app.use('/timesheet', require('./routes/timesheet'));
app.use('/projects', require('./routes/projects'));

// 5. Catch-all route
app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(angularDistPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;

connectSnowflake((err) => {
  if (err) {
    console.error('Exiting due to Snowflake connection error.');
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
