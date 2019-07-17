const authResolver = require('./auth');
const UserResolver = require('./userResolver');
// const bookingResolver = require('./booking');

const rootResolver = {
  ...authResolver,
  ...UserResolver
  // ...bookingResolver
};

module.exports = rootResolver;
