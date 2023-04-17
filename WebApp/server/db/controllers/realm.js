// external
const mongoose = require('mongoose');
const lol = require('legends-of-leakos');
const LibraryRealm = lol.Classes.RealmsAndLand.LibraryRealm;

// internal
const { Realm, DefaultRealm } = require('../models/Realm.js');
const User = require('../models/Users.js');

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
    const realmId = req.params.realm_id;
    const updates = req.body;

    // do a check on realm validity
    const realm = LibraryRealm.fromJSON(updates);
    if (!realm || !realm.isRealmValid()) {
      return res.status(400).json({ message: 'Invalid realm' });
    }

    // Find the realm by ID and update it with the new data
    const updatedRealm = await Realm.findByIdAndUpdate(realmId, updates, {
      new: true, // This option returns the modified document rather than the original
      runValidators: true, // This option applies the schema's validation rules before updating
    });

    if (!updatedRealm) {
      return res.status(404).json({ message: 'Realm not found' });
    }

    res.status(200).json(updatedRealm);
  } catch (error) {
    res.status(500).json({ message: 'Error updating realm', error });
  }
};

const deleteRealm = async (req, res) => {
  try {
    const realmId = req.params.realm_id;
    if (!realmId) {
      return res.status(400).json({ message: 'No realm ID provided' });
    }
    const deletedRealm = await Realm.findByIdAndDelete(realmId);

    if (!deletedRealm) {
      return res.status(404).json({ message: 'Realm not found' });
    } else {
      res.status(200).json(deletedRealm);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting realm', error });
  }
};


// get all the authenticated user's realms
// if the user doesn't have an realms, get the default realms
const getRealmsAPI = async (req, res) => {
  try {
    const realms = await Realm.find({ user_id: req.user._id });
    if (!realms) {
      res.status(404).json({ message: 'No realms found' });
    } else if (realms.length === 0) {
      return getDefaultRealmsAPI(req, res);
    } else {
      res.status(200).json(realms);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting realms', error });
  }
};

const getUserRealms = async (user) => {
  try {
    const realms = await Realm.find({
      user_id: user._id,
    });
    if (!realms) {
      console.log('ERROR: no realm object');
    } else if (realms.length === 0) {
      console.log('getUserRealms: no realms found, returning default realms');
      return getDefaultRealms();
    } else {
      return realms;
    }
  } catch (error) {
    console.log('Error getting realms', error);
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

const getDefaultRealmsAPI = async (req, res) => {
  try {
    const realms = await DefaultRealm.find();
    if (!realms) {
      return res.status(404).json({ message: 'No realms found' });
    } else {
      res.status(200).json(realms);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting realms', error });
  }
};

const getDefaultRealms = async () => {
  try {
    const realms = await DefaultRealm.find();
    if (!realms) {
      console.log('ERROR: no realm object');
    } else {
      return realms;
    }
  } catch (error) {
    console.log('Error getting default realms', error);
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

const getUserSelectedRealm = async (userID) => {
  try {
    const user = User.findOne({ _id: userID });
    if (!user) {
      console.log('ERROR: no user object');
      return null;
    } else {
      return getRealmByID(user.selectedRealm);
    }
  } catch (error) {
    console.log('Error getting user selected realm', error);
  }
};

module.exports = {
  createRealm,
  updateRealm,
  deleteRealm,
  getUserRealms,
  getRealmsAPI,
  getRealmByID,
  getUserSelectedRealm,
};
