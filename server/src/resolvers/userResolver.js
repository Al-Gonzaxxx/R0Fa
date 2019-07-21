const User = require('../models/user');

const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query:{
  	users: async (parent, args, context) => {
    
    if(!context.req.isAuth){
      throw new AuthenticationError('you must be logged in'); 
    }
    try {
      const allusers = await User.find({});
      return allusers;
    } catch (err) {
      throw err;
    }
  }
  }
};
