const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//const cors = require('cors');

const { ApolloServer } = require('apollo-server-express');


const { contextFunction } = require('./middleware/is-auth');
const typeDefs = require('./schema/typeDefs');
const { PORT,DBURI} = require('./modules/common/const');
const resolvers = require('./resolvers/index');




var step = 1;
var rocket = '🚀';


//app.use(cors());

const server = new ApolloServer({ 
	typeDefs, 
	resolvers,
	context: ({req}) => contextFunction({req})
});


// ---sync---

mongoose.connect(DBURI);
mongoose.connection.once('open',()=>{
	console.log(rocket.repeat(step++) + 'connected to Database');
});

const app = express();
app.use(cookieParser());
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  	console.log(rocket.repeat(step++) + ` Server ready at localhost:${PORT}`)
});


