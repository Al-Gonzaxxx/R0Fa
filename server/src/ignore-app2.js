const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server');


const { contextFunction } = require('./middleware/is-auth');
const typeDefs = require('./schema/typeDefs');
const { PORT,DBURI} = require('./modules/common/const');
const resolvers = require('./resolvers/index');



var step = 1;
var rocket = '🚀';


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => contextFunction(req)
});


mongoose.connect(DBURI);
mongoose.connection.once('open',()=>{
	console.log(rocket.repeat(step++) + 'connected to Database');
});


server.listen({ port: PORT},()=>{
	console.log(rocket.repeat(step++) + ` Server ready at localhost:${PORT}`);
});



