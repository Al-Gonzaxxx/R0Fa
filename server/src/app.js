const express = require('express');
const mongoose = require('mongoose');
const graphglHTTP =  require('express-graphql');
const schema = require('./schema/schema.js');
const fs = require('fs');
const https = require('https');
const { PORT,DBURI } = require('./modules/common/const.js');
const app = express();

var step = 1;
var rocket = '🚀';

app.use('/graphql',graphglHTTP({
  schema,
  graphiql: true
}));




//;(async() => {

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



//})



	
 