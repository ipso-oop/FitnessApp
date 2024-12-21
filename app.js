require('dotenv').config();
const express = require('express');
const app = express();

// Weiterleitung aller Anfragen an die Netlify Function
app.use('/api', (req, res) => {
  res.redirect(307, '/.netlify/functions/api' + req.url);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
