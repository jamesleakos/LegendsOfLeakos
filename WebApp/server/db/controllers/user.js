const User = require('../models/Users.js');

const getUserById = async (id) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    console.log('ERROR: User object not found');
  } else if (user.length === 0) {
    console.log('ERROR: No users found');
  } else {
    out = user.toObject();
    out.id = user._id.toString();
    return user;
  }
};

exports.getUserById = getUserById;
