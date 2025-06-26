const express = require('express');
const session = require('express-session');
require('dotenv').config();
const path = require('path');
const { connectSnowflake } = require('./db');
const cors = require('cors');
// Add Swagger dependencies
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// 1. CORS Middleware FIRST
app.use(cors({
  origin: 'http://localhost:4200',
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
    sameSite: 'none',
    secure: false
  }
}));

// 3. Configure Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Node.js backend',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}` }
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 4. Serve Angular static files
const angularDistPath = path.join(__dirname, 'dist', 'my-angular-app', 'browser');
app.use(express.static(angularDistPath));

// 5. Routes
app.use('/', require('./routes/auth'));
app.use('/timesheet', require('./routes/timesheet'));
app.use('/projects', require('./routes/projects'));

// 6. Catch-all route excluding /api and /api-docs
app.get(/^\/(?!api|api-docs).*/, (req, res) => {
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
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
});
