var express = require('express');
var router = express.Router();


router.use((req,res,next) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Time: ',Date.now(),' Request from: ',ip)；
});


router.get('/',function( req, res){ res.send('home page'); });
router.get('/about', function( req, res){ res.send('About page'); });
router.get('/verifyEmail',function( req, res){
  var email = req.param('email');
  
});








// module.exports = (req, res, next) => {
  // const authHeader = req.get('Authorization');
  // if (!authHeader) {
  //   req.isAuth = false;
  //   return next();
  // }
  // const token = authHeader.split(' ')[1];
  // if (!token || token === '') {
  //   req.isAuth = false;
  //   return next();
  // }
  // let decodedToken;
  // try {
  //   decodedToken = jwt.verify(token, 'somesupersecretkey');
  // } catch (err) {
  //   req.isAuth = false;
  //   return next();
  // }
  // if (!decodedToken) {
  //   req.isAuth = false;
  //   return next();
  // }
  // req.isAuth = true;
  // req.userId = decodedToken.userId;
  // next();
//};
