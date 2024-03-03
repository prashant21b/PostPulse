const mongoose = require('mongoose');
const User = require('./user');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  photo: {
    type:String,
    required:false
},
  likes: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
