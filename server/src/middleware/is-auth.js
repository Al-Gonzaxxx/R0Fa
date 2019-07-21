//copied

const jwt = require('jsonwebtoken');


 const contextFunction = ({ req }) => {
  

  const cookie = req.cookie;
  if (!cookie) {
    req.isAuth = false;
    return { req };
  }
  const jwttoken = cookie.jwt;
  if(!jwttoken){
    req.isAuth = false;
    return { req };
  }
  const token = jwttoken.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return { req };
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretkey');
  } catch (err) {
    req.isAuth = false;
    return { req };
  }
  if (!decodedToken) {
    req.isAuth = false;
    return { req };
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  return { req };
};


module.exports = {
  contextFunction
}

