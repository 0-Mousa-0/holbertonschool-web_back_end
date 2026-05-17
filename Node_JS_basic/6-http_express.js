const express = require('express');

const app = express();
const PORT = 1245;

// Route matching explicitly for the root URI path position
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.listen(PORT);

module.exports = app;