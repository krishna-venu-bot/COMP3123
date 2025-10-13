// server.js
require('dotenv').config(); // reads .env in this folder

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ---- ENV ----
const PORT = process.env.PORT || 8081;
// Accept common names so your starter works no matter which is used
let MONGO = (process.env.MONGODB_URI || process.env.MONGO_URI || '').toString().trim();
if (!MONGO) {
  // Fallback to local MongoDB if no env var is set
  MONGO = 'mongodb://127.0.0.1:27017/notes_db';
}

const app = express();
app.use(cors());
app.use(express.json());

// ---- MONGOOSE MODEL (matches sample payload shape) ----
// Payload:
// {
//   "content": {
//     "noteTitle": "Sample Note Title",
//     "noteDescription": "Sample Note Description",
//     "priority": "HIGH",
//     "dateAdded": "06/Oct/2025",
//     "dateUpdated": "06/Oct/2025"
//   }
// }
const noteSchema = new mongoose.Schema(
  {
    content: {
      noteTitle: { type: String, required: true, trim: true },
      noteDescription: { type: String, default: '' },
      priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'LOW' },
      // Using strings to align exactly with your sample dates; switch to Date if you prefer
      dateAdded: { type: String, default: '' },
      dateUpdated: { type: String, default: '' }
    }
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

// ---- ROUTES ----
app.get('/', (_req, res) => {
  res.json({ ok: true, message: 'Server & DB OK', port: PORT });
});

// Create
app.post('/api/notes', async (req, res) => {
  try {
    const note = await Note.create(req.body); // expects { content: {...} }
    return res.status(201).json(note);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Read all
app.get('/api/notes', async (_req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// Read one
app.get('/api/notes/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });
  res.json(note);
});

// Update
app.put('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!note) return res.status(404).json({ error: 'Not found' });
    res.json(note);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Delete
app.delete('/api/notes/:id', async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

// ---- START ----
(async () => {
  try {
    mongoose.set('strictQuery', true);
    // Helpful preview for debugging scheme issues
    console.log('Connecting to Mongo (preview):', JSON.stringify(MONGO.slice(0, 30)));
    await mongoose.connect(MONGO, { dbName: 'notes_db' });
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Could not connect to the database. Exiting now...', err);
    process.exit(1);
  }
})();
