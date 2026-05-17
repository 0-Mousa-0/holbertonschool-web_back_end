import fs from 'fs';

/**
 * Reads the CSV database file asynchronously.
 * @param {string} path - Database location.
 * @returns {Promise<Object>} An object containing fields and arrays of first names.
 */
export function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const studentRecords = lines.slice(1);
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
      resolve(fields);
    });
  });
}