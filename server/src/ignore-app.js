const express = require('express');
const mongoose = require('mongoose');
const graphglHTTP =  require('express-graphql');
const fs = require('fs');
const https = require('https');
const cors = require('cors');



const schema = require('./schema/schema.js');
const { PORT,DBURI} = require('./modules/common/const.js');
const resolver = require('./resolvers/index.js');
const userRoute = require('./routes/userRouter');



const app = express();
var step = 1;
var rocket = '🚀';




//allow cors
app.use(cors());

app.use('/graphql',graphglHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true
}));

// ---sync---

	mongoose.connect(DBURI);
	mongoose.connection.once('open',()=>{
		console.log(rocket.repeat(step++) + 'connected to Database');
	});

	https.createServer({
	key: fs.readFileSync('./https/server.key'),
	cert: fs.readFileSync('./https/server.cert')
	},app
	).listen({ port: PORT},()=>{
		console.log(rocket.repeat(step++) + ` Server ready at localhost:${PORT}`);
	});

