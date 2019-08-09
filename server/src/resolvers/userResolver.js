const Post = require('../models/post');

const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query:{
  	getUsers: async (parent, args, context) => {
      if(!context.req.isAuth){
        throw new AuthenticationError('you must be logged in'); 
      }
      try {
        const allusers = await User.find({});
        return allusers;
      } catch (err) {
        throw err;
      }
  },
    getCurrentUser: async (parent, args, context) => {
      if(!context.req.isAuth){
        throw new AuthenticationError('you must be logged in'); 
      }
      try {
          let id = context.req.userId;
          const curUser = await User.findById(id);
          return curUser;
      }catch(err){
        throw err;
      }
    }
  },

  Mutation:{
    createPost: async(parent,args,context) => {
      try{
        let input = args.postInput;
        const newPost = new Post({
          text: input.text,
          pictures: input.pictures
        });
        const result = await newPost.save();  
        console.log(result);
        return result;
      }catch(err){
        throw err;
      }
    }
  }
};
