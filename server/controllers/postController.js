
const User=require('../models/user')
const BlogPost=require('../models/post');
const {getDataUri } = require('../utils/datauri');
const Comment=require('../models/comment')

exports.createPost= async (req, res) => {

  console.log(req.file, req.body, 16)
  try {
      const title = req.body.title
      const categories=req.body.categories
      const content = req.body.content
      const imageUrl = req.file.path.replace(/\s+/g, '');
      const author=req.body.author
      if (!title || !categories || !content || !imageUrl || !author) {
          return res.send({ code: 400, message: 'Bad Request' })
      }

      const newService = new BlogPost({ title: title,categories:categories, content:content ,photo: imageUrl,author:author })

      const success = await newService.save()

      res.status(200).json({
        sucess:true,
        data:success,
        message:"created"

      })
  }
  catch (err) {
    console.log(err);
     res.status(500).json({
      sucess:false,
      message:"error"
     })
  }

}


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
    console.log(id)
    const post = await BlogPost.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increase the value of the 'like' field by 1
    post.likes += 1;
    await post.save();

    res.json({ message: 'Like updated successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.dislikeController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const post = await BlogPost.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Increase the value of the 'like' field by 1
    post.likes -= 1;
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

    // Delete the item
    await BlogPost.deleteOne({ _id: itemId });

    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.commentController = async (req, res) => {
  try {
    const { comment, userId, postId } = req.body;

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

// exports.editPost = async (req, res) => {
//   try {
//     const { id,title, content, categories,photo } = req.body;
//     const updatedBlog = await BlogPost.findByIdAndUpdate(
//       id,
//       { title, content, categories,photo },
//       { new: true } 
//     );
//     if (!updatedBlog) {
//       return res.status(404).json({ error: 'Blog not found' });
//     }
//     res.status(200).json({ sucess:true,message: 'Blog updated successfully', blog: updatedBlog });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

exports.editPost = async (req, res) => {
  try {
    const { id, title, content, categories } = req.body;
    let photo =req.file?.path.replace(/\s+/g, '');

    const updatedBlog = await BlogPost.findByIdAndUpdate(
      id,
      { title, content, categories, photo },
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
