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
    url: String,
    public_id: String
},
likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
// comments:
//         [
//             {
//                 text:String,
//                 created:{type:Date,default:Date.now},
//                 postedBY: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: "User"
//                 },
//             }

//         ]
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
