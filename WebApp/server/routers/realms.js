const express = require('express');
const router = express.Router();
const passport = require('passport');
// internal
const RealmController = require('../db/controllers/realm.js');

router.get('/', (req, res) => {
  RealmController.getRealms(req, res);
});

module.exports = router;
