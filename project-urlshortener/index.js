require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const urlShortener = require('./shortner');

// Basic Configuration
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.use('/public', express.static(`${process.cwd()}/public`));
// Example POST route to log req.body
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
app.post('/api/log-body', (req, res) => {
  console.log('Request Body:', req.body); // Lhttp://localhost:5000/api/log-body/og the request body to the console
  res.json({ message: 'Request body logged', data: req.body });
});
app.use('/api',urlShortener);

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
