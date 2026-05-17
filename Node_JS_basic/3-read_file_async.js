const fs = require('fs');

/**
 * Asynchronously reads a CSV database and calculates statistics.
 * @param {string} path - The path to the CSV file.
 * @returns {Promise<void>} Resolves when log statements finish executing.
 */
function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve();
        return;
      }

      const studentRecords = lines.slice(1);
      console.log(`Number of students: ${studentRecords.length}`);

      const fields = {};
      studentRecords.forEach((record) => {
        const columns = record.split(',');
        const firstName = columns[0];
        const field = columns[3];

        if (field && firstName) {
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstName);
        }
      });

      for (const [field, names] of Object.entries(fields)) {
        console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      }
      resolve();
    });
  });
}

module.exports = countStudents;