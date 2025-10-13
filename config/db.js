// ./config/db.js
const mongoose = require('mongoose');

module.exports = async function connectDB() {
  // Accept common env names
  let uri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.DATABASE_URL ||
    '';

  // Normalize (strip quotes/whitespace)
  uri = (uri || '').toString().trim().replace(/^['"]|['"]$/g, '');

  // DEBUG: show first characters so we can see the scheme
  console.log('🔎 Raw env names present:', {
    has_MONGODB_URI: Boolean(process.env.MONGODB_URI),
    has_MONGO_URI: Boolean(process.env.MONGO_URI),
    has_DATABASE_URL: Boolean(process.env.DATABASE_URL),
  });
  console.log('🔎 Effective Mongo URI preview:', JSON.stringify(uri.slice(0, 30)));

  if (!uri || !(uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'))) {
    throw new Error(
      'MONGODB_URI/MONGO_URI missing or invalid. It must start with "mongodb://" or "mongodb+srv://".'
    );
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: 'notes_db' });
  console.log('✅ MongoDB connected');
};
