const AuthResolver = require('./auth');
const UserResolver = require('./userResolver');

const rootResolver = {
  Query:{
  	...AuthResolver.Query,
  	...UserResolver.Query
  },
  Mutation:{
  	...AuthResolver.Mutation,
  	...UserResolver.Mutation
  }

  
  // ...bookingResolver
};

module.exports = rootResolver;
