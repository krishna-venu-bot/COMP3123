<<<<<<< HEAD
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

/* ---------------- Middleware ---------------- */
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form bodies

// Serve static files from ./public (instruction.html will be at /instruction.html)
app.use(express.static(path.join(__dirname, "public")));

/* ---------------- Routes ---------------- */

// A) GET /hello -> "Hello Express JS"
app.get("/hello", (req, res) => {
  res.type("text/plain").send("Hello Express JS");
});

// B) GET /user?firstname=&lastname=  (query params)
// Defaults: firstname=Pritesh, lastname=Patel if not provided
app.get("/user", (req, res) => {
  const firstname = req.query.firstname || "Pritesh";
  const lastname = req.query.lastname || "Patel";
  res.json({ firstname, lastname });
});

// C) POST /user/:firstname/:lastname  (path params)
app.post("/user/:firstname/:lastname", (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

// D) POST /users  (body = array of users with firstname & lastname)
// Accept either raw array or { "users": [ ... ] }
app.post("/users", (req, res) => {
  const body = req.body;
  const incoming = Array.isArray(body) ? body : Array.isArray(body?.users) ? body.users : null;

  if (!incoming) {
    return res.status(400).json({
      error:
        "Provide an array of users. Examples:\n1) [ {\"firstname\":\"Pritesh\",\"lastname\":\"Patel\"} ]\n2) { \"users\": [ {\"firstname\":\"Pritesh\",\"lastname\":\"Patel\"} ] }"
    });
  }

  const sanitized = incoming.map(u => ({
    firstname: String(u.firstname ?? ""),
    lastname: String(u.lastname ?? "")
  }));

  res.json(sanitized);
});

/* -------------- 404 + Error Handlers -------------- */
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Static file: http://localhost:${PORT}/instruction.html`);
=======
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
>>>>>>> 8ee33af09f2519335341a0517af853f7d6ead218
});
