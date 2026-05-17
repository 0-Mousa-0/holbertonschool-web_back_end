import { readDatabase } from '../utils';

export default class StudentsController {
  /**
   * Retrieves and formats lists for all students across all fields.
   */
  static getAllStudents(request, response) {
    const dbFile = process.argv[2];

    readDatabase(dbFile)
      .then((fields) => {
        let output = 'This is the list of our students\n';

        // Sort keys alphabetically (case-insensitive)
        const sortedFields = Object.keys(fields).sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );

        sortedFields.forEach((field, index) => {
          const names = fields[field];
          output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
          if (index < sortedFields.length - 1) output += '\n';
        });

        return response.status(200).send(output);
      })
      .catch(() => {
        return response.status(500).send('Cannot load the database');
      });
  }

  /**
   * Filters and extracts student datasets aligned to a specific major.
   */
  static getAllStudentsByMajor(request, response) {
    const dbFile = process.argv[2];
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    readDatabase(dbFile)
      .then((fields) => {
        const names = fields[major] || [];
        return response.status(200).send(`List: ${names.join(', ')}`);
      })
      .catch(() => {
        return response.status(500).send('Cannot load the database');
      });
  }
}