const { Realm } = require('../models/Realm.js');

const createRealm = async (req, res) => {
  try {
    const realmData = req.body;
    const newRealm = new Realm(realmData);
    await newRealm.save();

    res.status(201).json(newRealm);
  } catch (error) {
    res.status(500).json({ message: 'Error creating realm', error });
  }
};

const updateRealm = async (req, res) => {
  try {
    const realmId = req.params.id;
    const updates = req.body;

    const realm = await Realm.findById(realmId);
    if (!realm) {
      return res.status(404).json({ message: 'Realm not found' });
    }

    Object.assign(realm, updates);
    await realm.save();

    res.status(200).json(realm);
  } catch (error) {
    res.status(500).json({ message: 'Error updating realm', error });
  }
};

module.exports = {
  createRealm,
  updateRealm,
};
