const mongoose = require('mongoose');

const lol = require('legends-of-leakos');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).lean();
    res.status(200).json(cards);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error returning cards' });
  }
};

module.exports = {
  getCards
};