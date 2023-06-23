const express = require('express');
const router = express.Router();
const passport = require('passport');
// internal
const CardController = require('../db/controllers/card.js');

router.get('/', (req, res) => {
  CardController.getCards(req, res);
});

module.exports = router;