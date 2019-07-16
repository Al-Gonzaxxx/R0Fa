const graphql = require('graphql');
const _= require('lodash');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLSchema
} = graphql;




const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    firstname: {type: GraphQLString},
    lastname: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString}
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent,args){
        // resolver
      }
    },
    user: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
      },
      resolve(parent,args){
        // resolver
      }
    }

  }
});


module.exports = new GraphQLSchema({
  query: RootQuery
});
