export default function createIteratorObject(report) {
  const employees = [];
  const { allEmployees } = report;

  for (const department in allEmployees) {
    employees.push(...allEmployees[department]);
  }

  return employees[Symbol.iterator]();
}
