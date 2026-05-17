const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
const DB_FILE = process.argv[2];

function aggregateStudentData(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }
      let output = '';
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const studentRecords = lines.slice(1);

      output += `Number of students: ${studentRecords.length}\n`;

      const fields = {};
      studentRecords.forEach((record) => {
        const columns = record.split(',');
        const firstName = columns[0];
        const field = columns[3];
        if (field && firstName) {
          if (!fields[field]) fields[field] = [];
          fields[field].push(firstName);
        }
      });

      const fieldKeys = Object.keys(fields);
      fieldKeys.forEach((field, index) => {
        output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
        if (index < fieldKeys.length - 1) output += '\n';
      });
      resolve(output);
    });
  });
}

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.set('Content-Type', 'text/plain');
  aggregateStudentData(DB_FILE)
    .then((dataStr) => {
      res.send(`This is the list of our students\n${dataStr}`);
    })
    .catch((err) => {
      res.send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(PORT);

module.exports = app;