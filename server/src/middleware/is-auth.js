//copied

const jwt = require('jsonwebtoken');
const { TOKENKEY } = require('../modules/common/const');


 function authentication(req,res,next){
  
  const cookies = req.cookies;
  if (!cookies) {
    console.log("cookies is null");
    req.isAuth = false;
    return next();
  }
  const jwttoken = cookies.jwt;
  if(!jwttoken){
    console.log("jwttoken is null");
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(jwttoken, TOKENKEY);
  } catch (err) {
    //console.log(err);
    console.log("token verify error ..1");
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    console.log("token verify error ..2");
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  req.token=jwttoken;
  console.log("authenticated...")
  return next();
};


module.exports = {
  authentication
}

