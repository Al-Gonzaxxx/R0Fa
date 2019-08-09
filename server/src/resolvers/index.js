const AuthResolver = require('./auth');
const UserResolver = require('./userResolver');
const CustomerResolver = require('./customerResolver');

const { GraphQLDateTime } = require('graphql-iso-date')

const rootResolver = {
  Query:{
  	...AuthResolver.Query,
  	...UserResolver.Query,
    ...CustomerResolver.Query
  },
  Mutation:{
  	...AuthResolver.Mutation,
  	...UserResolver.Mutation,
    ...CustomerResolver.Mutation
  },
  // scalar type

  DateTime : GraphQLDateTime  
  

  
  // ...bookingResolver
};

module.exports = rootResolver;
