//const graphql = require('graphql');

// const { 
//   GraphQLObjectType, 
//   GraphQLString, 
//   GraphQLID, 
//   GraphQLSchema,
//   GraphQLList,
//   GraphQLNonNull
// } = graphql;


// //  types

// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: () => ({
//     id: {type: GraphQLID},
//     firstname: {type: GraphQLString},
//     lastname: {type: GraphQLString},
//     email: {type: GraphQLString},
//     password: {type: GraphQLString}
//   })
// });

// // queries

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     // user: {
//     //   type: UserType,
//     //   args: {
//     //     id: {type: GraphQLID}
//     //   },
//     //   resolve(parent,args){
//     //     return User.findByID(args.id);
//     //   }
//     // },
//     login: {
//       type: UserType,
//       args: {
//         email: {type: GraphQLString},
//         password: {type: GraphQLString}
//       },
//       resolve(parent,args){
//         const userPromise =  User.findOne({
//           email: args.email
//         });
//         userPromise.then(function(user){
//           let match = check(args.password, user.password);
//           if(match)
//             return new Promise(user);
//           else
//             return null;
//         });
//       }
//     },
//     users: {                            
//       type: new GraphQLList(UserType),
//       resolve(parent,args){
//         return User.find({});
//       }
//     }

//   }
// });

// // mutations

// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     addUser: {
//        type: UserType,
//        args: {
//          firstname: {type: new GraphQLNonNull(GraphQLString)},
//          lastname: {type: new GraphQLNonNull(GraphQLString)},
//          email: {type: new GraphQLNonNull(GraphQLString)},
//          password: {type: new GraphQLNonNull(GraphQLString)}
//        },
//        resolve(parent, args){
//          let newuser = new User({
//            firstname: args.firstname,
//            lastname: args.lastname,
//            email: args.email,
//            password: hash(args.password)      //TODO: should hash before storing to db
//          });
//          return newuser.save();
//        }
//     },
//     resetPassword: {
//       type: UserType,
//       args: {
//         email: {type: new GraphQLNonNull(GraphQLString)},
//         password: {type: new GraphQLNonNull(GraphQLString)}
//       },
//       resolve(parent, args){
//         //TODO: should hash before storing to db
//         return User.findOneAndUpdate({email: args.email}, {password: args.password},{new: true, useFindAndModify: true});
//       }
//     }
//   }
// })

// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation
// });




const { buildSchema } = require('graphql');


module.exports = buildSchema(`

type UserType {
  _id: ID!
  firstname: String!
  lastname: String!
  email: String!
  password: String!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  email: String!
  password: String!
  firstname: String!
  lastname: String!
}

type RootQuery {
    users: [UserType!]
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createUser(userInput: UserInput): UserType
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);

