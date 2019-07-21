const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');

const { SALTROUNDS  } = require('../modules/common/const.js');
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
    console.log(parent);
    console.log(args);
    console.log(context);
    console.log(info);
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
      const newToken = new Token({
        _userId: result.id,
        token: crypto.randomBytes(16).toString('hex')
      });
      await newToken.save();
      msg.to = args.userInput.email;
      var link = 'www.google.com';
      //TODO generate verifyEmailGet URL and good html 
      msg.html = `<div> <h2> Please click the follow link to verify your email</h2> <strong> ${link}</strong> </div>`;
      await sgMail.send(msg);
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
 },


Query:{

  login: async (parent, args, context, info) => {
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
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },


  verifyEmail: async (parent, args, context, info) => {

    const resultToken = await Token.findOne({token: args.token});
    if(!resultToken){
      throw new Error('Invalid Token..');
    }
    const user = await User.findById(resultToken._userId);
    if(!user){
      resultToken.remove();
      throw new Error('Token exist, but user doesn\'t exist');
    }
    if(args.email !== user.email){
      throw new Error('Email token mismatch...');
    }
    if(user.isVerified){
      resultToken.remove();
      throw new Error('Email has been verified already.');
    }
    user.isVerified = true;
    user.save();
    resultToken.remove();
    return { status: 'OK', message: 'Email is verified now.' };
  }
}
  
};
