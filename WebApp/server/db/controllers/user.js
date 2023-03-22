const User = require('../models/Users.js');

const getUserById = async (id) => {
  const users = await User.find({ _id: id });
  if (!users) {
    console.log('ERROR: User object not found');
  } else if (users.length === 0) {
    console.log('ERROR: No users found');
  } else if (users.length > 1) {
    console.log('ERROR: More than one user found');
    return users[0];
  } else {
    return users[0];
  }
};

exports.getUserById = getUserById;
