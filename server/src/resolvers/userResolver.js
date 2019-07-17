const User = require('../models/user');

module.exports = {
  users: async args => {
    try {
      const allusers = await User.find({});
      return allusers;
    } catch (err) {
      throw err;
    }
  }
};
