const express = require('express');
const graphglHTTP =  require('express-graphql');
const schema = require('./schema/schema.js');
const { PORT } = require('./modules/common/const.js');

const app = express();
app.use('/graphql',graphglHTTP({
  schema,
  graphiql: true
}));
app.listen({ port: PORT}, ()=>{
  console.log(`🚀 Server ready at localhost:${PORT}`);
});
