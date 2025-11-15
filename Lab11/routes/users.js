console.log('USING FILE:', __filename);  // <- helps verify what’s loaded

const express = require('express');      // <== this line is critical
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/profile', (req, res) => {
  const file = path.join(__dirname, '..', 'user.json');
  const data = fs.readFileSync(file, 'utf8');
  res.json(JSON.parse(data));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const file = path.join(__dirname, '..', 'user.json');
  const user = JSON.parse(fs.readFileSync(file, 'utf8'));

  if (username !== user.username)
    return res.json({ status: false, message: 'User Name is invalid' });
  if (password !== user.password)
    return res.json({ status: false, message: 'Password is invalid' });
  res.json({ status: true, message: 'User Is valid' });
});

router.get('/logout/:username', (req, res) => {
  res.send(`<b>${req.params.username} successfully logged out.</b>`);
});

module.exports = router;
