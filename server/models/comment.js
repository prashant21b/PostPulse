const mongoose = require('mongoose');
const User=require('./user');
const BlogPost=require('./post');
const commentSchema = new mongoose.Schema({
    comment:{
    type:String,
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost'
  },
  
},{ timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
