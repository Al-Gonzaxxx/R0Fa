const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { ApolloServer } = require('apollo-server-express');


const { authentication } = require('./middleware/is-auth');
const typeDefs = require('./schema/typeDefs');
const { PORT,DBURI} = require('./modules/common/const');
const resolvers = require('./resolvers/index');




var step = 1;
var rocket = '🚀';
const app = express();

//middlewares
app.use(cookieParser());
app.use(authentication);

//graphql server
const server = new ApolloServer({ 
	typeDefs, 
	resolvers,
	context: (req,res) => ({...req,...res})
});

//db connection
mongoose.connect(DBURI);
mongoose.connection.once('open',()=>{
	console.log(rocket.repeat(step++) + 'connected to Database');
});

server.applyMiddleware({ 
	app,
	cors: true,
 });

app.listen({ port: 4000 }, () => {
  	console.log(rocket.repeat(step++) + ` Server ready at localhost:${PORT}`)
});


