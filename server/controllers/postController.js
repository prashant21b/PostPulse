
const User=require('../models/user')
const BlogPost=require('../models/post');
const {getDataUri } = require('../utils/datauri');
const Comment=require('../models/comment')
const cloudinary=require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_secret,
});

exports.uploadImage=async(req,res)=>{
  try{ 
   // console.log(req)
    //console.log(req.files.images.path)
     const result=await cloudinary.uploader.upload(req.files.image.path)
     console.log("result->",result)
     res.json({
      url:result.secure_url,
      public_id:result.public_id
     })

  }
  catch(error){

  }
}

exports.createPost = async (req, res) => {
  try {
    const { title, categories, content, author, photoUrl, photoPublicId } = req.body;
     console.log("34",req.body);
    if (!title || !categories || !content || !photoUrl || !photoPublicId || !author) {
      return res.status(400).json({ code: 400, message: 'Bad Request' });
    }


    const newBlogPost = new BlogPost({
      title,
      categories,
      content,
      author,
      photo: {
        url: photoUrl,
        public_id: photoPublicId
      }
    });

    const savedPost = await newBlogPost.save();

    res.status(200).json({
      success: true,
      data: savedPost,
      message: "Created"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error"
    });
  }
};


exports.getAllPost = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author');
    res.status(200).json({
      success: true,
      data: posts,
      message: "All posts"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getting posts"
    });
  }
};

exports.getComments = async (req, res) => {
  const {id}=req.body;
console.log("post",id)
  try {
    // Find the comments for the given post ID and populate the user and post fields
   
    const comments = await Comment.find({post:id}).populate('user').populate('post');
    console.log(comments)
    res.status(200).json({
      success: true,
      data: comments,
      message: "Comments"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.likeController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.user)
    const userId = req.user;
     
    const post = await BlogPost.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if the user has already liked the post
    const userHasLiked = post.likes.includes(userId);

    if (userHasLiked) {
      // If the user has already liked the post, remove the like
      post.likes.pull(userId);
    } else {
      // If the user hasn't liked the post, add the like
      post.likes.push(userId);
    }

    await post.save();

    res.json({ message: 'Like updated successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





exports.getUserPost=async (req,res)=>{
  try{
const userId=req.params.userId;
const posts=await BlogPost.find({author:userId});
res.status(200).json({
  sucess:true,
  data:posts,
  message:"user post getted"
})
  }
  catch(error){
res.status(500).json({
  sucess:false,
  message:"errorin message"
})
  }
}

exports.deleteItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    // Check if the item exists in the database
    const item = await BlogPost.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Delete the related comments
    await Comment.deleteMany({ post: itemId });

    // Delete the item
    await BlogPost.deleteOne({ _id: itemId });

    return res.status(200).json({ message: 'Item and related comments deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.commentController = async (req, res) => {
  try {
    const { comment, postId } = req.body;
     const userId=req.user
    const newComment = new Comment({
      comment: comment,
      user: userId,
      post: postId,
    });

    const savedComment = await newComment.save();
    res.status(200).json({
      sucess:true,
      message:"comment created",
      data:savedComment});
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the comment' });
  }
};


exports.editPost = async (req, res) => {
  try {
    const { id, title, content, categories,imageUrl,publicKey } = req.body;
   

    const updatedBlog = await BlogPost.findByIdAndUpdate(
      id,
      { title, content, categories, photo:{
             url:imageUrl,
             public_id:publicKey
      } 
    },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      blog: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
