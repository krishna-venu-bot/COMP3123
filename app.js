const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware (serves /instruction.html from /public)
app.use(express.static(path.join(__dirname, "public")));

/* -------------------- Routes -------------------- */

// A) GET /hello -> plain text
app.get("/hello", (req, res) => {
  res.type("text").send("Hello Express JS");
});

// B) GET /user?firstname=...&lastname=...
app.get("/user", (req, res) => {
  const { firstname = "Pritesh", lastname = "Patel" } = req.query;
  res.json({ firstname, lastname });
});

// C) POST /user/:firstname/:lastname  (path params)
app.post("/user/:firstname/:lastname", (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

// D) POST /users  (expects array of users in body)
// Accept either { "users": [ {firstname, lastname}, ... ] } or raw array [ ... ]
app.post("/users", (req, res) => {
  const users = Array.isArray(req.body)
    ? req.body
    : Array.isArray(req.body?.users)
    ? req.body.users
    : [];

  if (users.length === 0) {
    return res.status(400).json({
      error:
        "Provide an array of users. Example: { \"users\": [ {\"firstname\":\"Pritesh\",\"lastname\":\"Patel\"} ] }"
    });
  }

  const normalized = users.map((u) => ({
    firstname: String(u.firstname ?? ""),
    lastname: String(u.lastname ?? "")
  }));

  res.json(normalized);
});

// 404 fallback
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
