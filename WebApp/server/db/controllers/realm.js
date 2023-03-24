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
  try {
    const realms = await Realm.find({ user_id: req.user._id });
    if (!realms) {
      res.status(404).json({ message: 'No realms found' });
    } else if (realms.length === 0) {
      return getDefaultRealms(req, res);
    } else {
      res.status(200).json(realms);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting realms', error });
  }
};

const getRealmByID = async (realmID) => {
  try {
    const realms = await Realm.find({ _id: realmID });
    if (!realms) {
      console.log('ERROR: no realm object');
      return null;
    } else if (realms.length === 0) {
      return getDefaultRealmByID(realmID);
    } else {
      return realms[0];
    }
  } catch (error) {
    console.log('Error getting realm by ID', error);
  }
};

const getDefaultRealms = async (req, res) => {
  try {
    const realms = await DefaultRealm.find();
    if (!realms) {
      return res.status(404).json({ message: 'No realms found' });
    } else {
      console.log(realms);
      res.status(200).json(realms);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting realms', error });
  }
};

const getDefaultRealmByID = async (realmID) => {
  try {
    const realms = await DefaultRealm.find({ _id: realmID });
    if (!realms) {
      console.log('ERROR: no realm object');
      return null;
    } else if (realms.length === 0) {
      console.log('no default realms found, returning random default realm');
      const defaultRealms = await DefaultRealm.find();
      if (!defaultRealms || defaultRealms.length === 0) {
        console.log('ERROR: no default realms');
        return null;
      }
      return defaultRealms[0];
    } else {
      return realms[0];
    }
  } catch (error) {
    console.log('Error getting realm by ID', error);
  }
};

module.exports = {
  createRealm,
  updateRealm,
  getRealms,
  getRealmByID,
};
