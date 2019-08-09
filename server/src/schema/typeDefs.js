const { gql } = require('apollo-server');


module.exports = gql`

scalar DateTime


type User {
  _id: ID!
  firstname: String!
  lastname: String!
  email: String!
  password: String!
}

type Response{
  likes: Int!
  dislikes: Int!
}


type Post {
  _id: ID!
  text: String!
  likes: Int!
  dislikes: Int!
  pictures: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Comment {
  _postId: ID!
  text: String!
  createdAt: DateTime!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

type NewUserReturn {
  _id: ID!
  token: String!
}

type ReturnData {
  status: String!
  message: String!
}

input UserInput {
  email: String!
  password: String!
  firstname: String!
  lastname: String!
}

input PostInput {
  text: String!
  pictures: String!
}

input CommentInput {
  postId: ID!
  text: String!
}

type Query {
    getUsers: [User!]
    getPosts: [Post!]
    getCommentsByPostId(postId: String!): [Comment!]
    getCurrentUser: User
    login(email: String!, password: String!): AuthData
    logout: ReturnData!
    verifyEmail(email: String!, token: String!): ReturnData!
}

type Mutation {
    createPost(postInput: PostInput!): Post!
    addComment(commentInput: CommentInput!): [Comment!]
    createUser(userInput: UserInput): NewUserReturn!
    addLike(postId: String!): Post!
    addDisLike(postId: String!): Post!
}



`