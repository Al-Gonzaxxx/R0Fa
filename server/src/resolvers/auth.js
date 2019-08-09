const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const { AuthenticationError } = require('apollo-server');

const { SALTROUNDS, TOKENKEY  , GETADDRESSURIBASE} = require('../modules/common/const.js');
const User = require('../models/user');
const Token = require('../models/token');




const msg = {
  to: '',
  from: 'R0Fa@design.com',
  subject: 'Please verify you email address',
  html: ''
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



module.exports = {

  Mutation:{
    createUser: async (parent, args, context, info) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already...');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, SALTROUNDS);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        firstname: args.userInput.firstname,
        lastname: args.userInput.lastname
      });
      const result = await user.save();
      let token = crypto.randomBytes(16).toString('hex');
      let uri =  "http://"+GETADDRESSURIBASE+"query%7B%20%20verifyEmail%28email%3A\""+user.email+"\"%2Ctoken%3A\""+token+"\"%29%7B%0A%20%20%20%20message%0A%20%20%20%20status%0A%20%20%7D%0A%7D";
      const newToken = new Token({
        _userId: result.id,
        token: token,
        uri:uri
      });
      await newToken.save();
      msg.to = args.userInput.email;
      //TODO generate verifyEmailGet URL and good html 
      msg.html = `<div><h2> Please click the follow link to verify your email</h2> <a href=${uri}>Here!!</a></div>`;
      await sgMail.send(msg);
      return  {token: newToken.token,_id:result.id};
    } catch (err) {
      throw err;
    }
  }

  
  
 },


Query:{

  login: async (parent, args, context, info) => {
    if(context.req.isAuth){
      return { userId: context.req.userId, token: context.req.token, tokenExpiration: 1 };
    }
    const user = await User.findOne({ email: args.email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(args.password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
        TOKENKEY,
      {
        expiresIn: '1h'
      }
    );
    let res = context.res;
    res.cookie("jwt",token,{ httpOnly: true } ); //TODO: secure: true  for https
    console.log("login successfully with token ", token);
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },

  verifyEmail: async (parent, args, context, info) => {
    const resultToken = await Token.findOne({token: args.token});
    if(!resultToken){
      throw new Error('Invalid Token');
    }
    const user = await User.findById(resultToken._userId);
    if(!user){
      resultToken.remove();
      throw new Error('Token exist, but user doesn\'t exist');
    }
    if(args.email !== user.email){
      throw new Error('Email token mismatch');
    }
    if(user.isVerified){
      resultToken.remove();
      throw new Error('Email has been verified already.');
    }
    user.isVerified = true;
    user.save();
    resultToken.remove();
    return { status: 'OK', message: 'Email is verified now.' };
  },

  logout: async (parent, args, context, info) => {
    if(!context.req.isAuth){
      throw new AuthenticationError('You are not Logged in.'); 
    }
    context.res.cookie("jwt","invalid_jwt_token_to_logout",{expries: Date.now() , httpOnly: true} ); //TODO: secure: true  for https
    console.log("logging out.");
    return { status:"OK", message:"Logout successfully"};
  }
   
}
  
};
