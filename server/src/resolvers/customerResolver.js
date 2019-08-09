const Post = require('../models/post');
const Comment = require('../models/comment');

const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query:{
  	getPosts: async (parent, args, context) => {
      try {
        const allPosts = await Post.find({});
        return allPosts;
      }catch(err){
        throw err;
      }
  },
    getCommentsByPostId: async (parent, args, context) => {
      try {
         const allComments = await Comment.find({_postId: args.postId});
         return allComments;
      }catch(err){
        throw err;
      }
    }
  },

  Mutation:{
    addLike: async (parent, args, context, info) => {
      try {
          const post = await Post.findByIdAndUpdate(args.postId,{ $inc : { likes : 1 } });
          post.likes = post.likes +1;
          return post;
      }catch(err){
        throw err;
      }
    },
    addDisLike: async (parent, args, context, info) => {
      try {
          const post = await Post.findByIdAndUpdate(args.postId,{ $inc : { dislikes : 1 } });
          post.dislikes = post.dislikes+1;
          return post;
      }catch(err){
        throw err;
      }
    },
    addComment: async (parent, args, context, info) => {
      try{
        let input = args.commentInput;
        const post = await Post.findById(input.postId);
        if(!post){
          throw new Error("Post dose not exist");
        }
        const newcomment = new Comment({
          text: input.text,
          _postId: input.postId
        });
        await newcomment.save();
        const allcomments = await Comment.find({_postId:input.postId});
        return allcomments;
      }catch(err){
        throw err;
      }
    }

    
  }
};
