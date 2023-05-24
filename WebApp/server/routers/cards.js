const express = require('express');
const router = express.Router();
const passport = require('passport');
// internal


router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;