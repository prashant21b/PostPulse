const express=require('express');
const { registerController, loginController, getProfile, forgotPasswordController} = require('../controllers/authController');
const { createPost, getAllPost, getComments, likeController, getUserPost, deleteItem, commentController, editPost, dislikeController, uploadImage } = require('../controllers/postController');
//const multer=require('multer');
const formidable=require('express-formidable');
const { requireSignin,isLogin } = require('../middlewares/authMiddleware');


const router=express.Router();

// const storage = multer.diskStorage({
//     destination: 'uploads/', 
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
  
//   // Create the multer instance with the defined storage configuration
//   const upload = multer({ storage });
router.post('/upload-image',
  formidable({ maxFileSize: 10 * 1024 * 1024 })
  ,
  uploadImage)
 router.post('/register',registerController)
router.post('/login',loginController);
 router.post('/create',createPost)
 router.get('/post',getAllPost)
 router.post('/comment',isLogin,commentController);
 router.post('/getcomment',getComments);
 router.post('/like/:id',isLogin,likeController)
// router.post('/dislike/:id',dislikeController)
router.get('/userpost/:userId',getUserPost);
router.post('/delete/:id',deleteItem)
router.put('/editpost',editPost);
router.post('/profile',getProfile);
router.post('/forgotpassword',forgotPasswordController)


module.exports=router;