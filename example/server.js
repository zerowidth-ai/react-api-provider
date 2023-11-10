const express = require('express');
const path = require('path');
const ZeroWidthApiExpress = require('@zerowidth/api').ZeroWidthApiExpress;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/0w-proxy', ZeroWidthApiExpress({
  secretKey: process.env.SECRET_KEY
}));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
