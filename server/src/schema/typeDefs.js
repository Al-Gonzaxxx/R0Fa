const { gql } = require('apollo-server');


module.exports = gql`
  
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

type ReturnDate {
  status: String!
  message: String!
}

input UserInput {
  email: String!
  password: String!
  firstname: String!
  lastname: String!
}

type Query {
    users: [UserType!]
    login(email: String!, password: String!): AuthData
    verifyEmail(email: String!, token: String!): ReturnDate
}

type Mutation {
    createUser(userInput: UserInput): UserType
}


`