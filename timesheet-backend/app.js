const express = require('express');
const session = require('express-session');
require('dotenv').config();
const { connectSnowflake } = require('./db');
const app = express();

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

// Routes (as before)
app.use('/', require('./routes/auth'));
app.use('/timesheet', require('./routes/timesheet'));
app.use('/projects', require('./routes/projects'));
app.use((req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 3000;

// Connect to Snowflake, then start server
connectSnowflake((err) => {
  if (err) {
    console.error('Exiting due to Snowflake connection error.');
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
