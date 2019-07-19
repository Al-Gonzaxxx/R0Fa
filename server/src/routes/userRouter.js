const express = require('express');
const { body, } = require('express-validator');
const router = express.Router();

const userController = require('../controllers/userController');



router.use((req,res,next) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Time: ',Date.now());
  next();
});


router.post('/comfirmation',userController.confirmationPost);
router.post('/resend',userController.resendTokenPost);
router.post('/login',userController.loginPost);
router.post('/signup',[
  body('email').not().isEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({min: 8}),
  body('password').not().isEmpty(),
  body('firstname').not().isEmpty(),
  body('lastname').not().isEmpty(),
  ],userController.signUpPost);


router.get('/',function(req,res){
  res.send({message: 'home page'});
});
router.get('/comfirmation',userController.comfirmationGet);




module.exports = router;






//module.exports = (req, res, next) => {
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
