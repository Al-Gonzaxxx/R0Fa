const graphql = require('graphql');
const _= require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema} = graphql;


const users = [
  {firstName: "Vic", lastName:"Chen",id:'1',email: "imkkkkk@177.com", password:"mypass"},
  {firstName: "Sam", lastName:"Smith",id:'2',email: "sam.smith@gmail.com", password:"mypass1"},
  {firstName: "ace", lastName:"Hood",id:'3',email: "9090900909@177.com", password:"mypa222s2s"},
  {firstName: "KGVC", lastName:"H",id:'4',email: "1324123423454654234@177.com", password:"m3ypass"}
]



const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
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
      //  email: {type: GraphQLString},
      id: {type: GraphQLID}
      //  password: {type: GraphQLString}
      },
      resolve(parent,args){
        console.log(args);
        return _.find(users,{ id: args.id});
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery
});
