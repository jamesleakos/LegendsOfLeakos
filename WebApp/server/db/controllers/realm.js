const { Realm, DefaultRealm } = require('../models/Realm.js');

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

// get all the authenticated user's realms
// if the user doesn't have an realms, get the default realms
const getRealms = async (req, res) => {
  console.log('user_id: ', req.user._id);
  try {
    const realms = await Realm.find({ user_id: req.user._id });
    if (!realms) {
      res.status(404).json({ message: 'No realms found' });
    } else if (realms.length === 0) {
      console.log('no realms found, getting default realms');
      return getDefaultRealms(req, res);
    } else {
      console.log('realms found');
      res.status(200).json(realms);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting realms', error });
  }
};

const getDefaultRealms = async (req, res) => {
  try {
    const realms = await DefaultRealm.find();
    if (!realms) {
      console.log('no default realms found');
      return res.status(404).json({ message: 'No realms found' });
    } else {
      console.log('default realms found');
      console.log(realms);
      res.status(200).json(realms);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting realms', error });
  }
};

module.exports = {
  createRealm,
  updateRealm,
  getRealms,
};
