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
});
