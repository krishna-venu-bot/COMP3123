// index.js
const http = require("http");
// Use Employee Module
const employees = require("./Employee");

console.log("Lab 03 -  NodeJs");

// Define Server Port
const port = process.env.PORT || 8081;

// Helpers for responses
function sendJSON(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(body);
}
function sendHTML(res, status, body) {
  res.writeHead(status, { "Content-Type": "text/html; charset=utf-8" });
  res.end(body);
}

// Derived data
function getFullNamesSorted() {
  return employees
    .map(e => `${e.firstName} ${e.lastName}`)
    .sort((a, b) => a.localeCompare(b));
}
function getTotalSalary() {
  return employees.reduce((sum, e) => sum + Number(e.Salary || 0), 0);
}

// Create Web Server using CORE API
const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    return sendJSON(res, 405, { error: "Method Not Allowed" });
  }

  if (req.url === "/") {
    // Display message "<h1>Welcome to Lab Exercise 03</h1>"
    return sendHTML(res, 200, "<h1>Welcome to Lab Exercise 03</h1>");
  }

  if (req.url === "/employee") {
    // Display all details for employees in JSON format
    return sendJSON(res, 200, employees);
  }

  if (req.url === "/employee/names") {
    // Display only all employees full names in ascending order (JSON Array)
    return sendJSON(res, 200, getFullNamesSorted());
  }

  if (req.url === "/employee/totalsalary") {
    // Display Sum of all employees salary in given JSON format
    // e.g. { "total_salary" : 100 }
    return sendJSON(res, 200, { total_salary: getTotalSalary() });
  }

  // Fallback 404
  return sendJSON(res, 404, { error: "Not Found" });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
