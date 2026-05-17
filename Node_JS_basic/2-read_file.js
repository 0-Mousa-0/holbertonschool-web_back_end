const fs = require('fs');

/**
 * Synchronously reads a CSV file and prints student metrics.
 * @param {string} path - Path to the target CSV database.
 */
function countStudents(path) {
  try {
    const fileContent = fs.readFileSync(path, 'utf-8');

    // Split lines and discard empty items
    const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    // Extract headers and processing rows
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
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;