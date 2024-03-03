const express=require('express');
const { registerController, loginController, getProfile, forgotPasswordController} = require('../controllers/authController');
const { createPost, getAllPost, getComments, likeController, getUserPost, deleteItem, commentController, editPost, dislikeController } = require('../controllers/postController');
const multer=require('multer');



const router=express.Router();

const storage = multer.diskStorage({
    destination: 'uploads/', 
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  // Create the multer instance with the defined storage configuration
  const upload = multer({ storage });
router.post('/register',registerController)
router.post('/login',loginController);
// router.post('/create',upload.single('photo'),createPost)
router.post('/create',upload.single('image'),createPost)
router.get('/post',getAllPost)
router.post('/comment',commentController);
router.post('/getcomment',getComments);
router.post('/like/:id',likeController)
router.post('/dislike/:id',dislikeController)
router.get('/userpost/:userId',getUserPost);
router.post('/delete/:id',deleteItem)
router.post('/editpost',upload.single('photo'),editPost);
router.post('/profile',getProfile);
router.post('/forgotpassword',forgotPasswordController)
module.exports=router;