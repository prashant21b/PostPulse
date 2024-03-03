const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt=require('jsonwebtoken');
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Please enter a username",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter an email",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter a password",
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered!",
        data: existingUser,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res.status(200).json({
      success: true,
      data: savedUser,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in user registration",
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(204).json({
        sucess: false,
        message: "please enter email or password",
      });
    }
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      return res.status(404).json({
        sucess: false,
        message: "Your email is not registered",
      });
    }
    const isMatched = await bcrypt.compare(password, isUser.password);
    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const jwtToken = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    isUser.jwtToken = jwtToken;
    isUser.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: false,
    };

    res.cookie("jwtToken", jwtToken, options).status(200).json({
      success: true,
      message: "Login successful",
      isUser,
      jwtToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "error in Login",
    });
  }
};

exports.authCtrl=async (req,res)=>{
  try{
   
const user=await User.findById({_id:req.user});
user.password=undefined;
console.log("user",user)
if(!user){
return res.status(200).json({
  message:"user not found",
  sucess:false,
})
}
else{
res.status(200).json({
  sucess:true,
  data:user,
})
}
  }
  catch(error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"auth error",
      error,
    })
  }
}



exports.getProfile=async(req,res)=>{
  try{
  const {id}=req.body;
  console.log(id);
  const user=await User.findById(id);
  if(!user){
    return res.status(404).json({
      sucess:true,
      message:"You are not a registered user please registor"
    })
  }
  else{
    res.status(200).json({
      sucess:true,
      data:user,
      message:"user data fetched"
    })
  }
  }
  catch(error){
res.status(500).json({
  sucess:false,
  message:"error in fetching data"
})
  }
}


exports.getAuthorById=async(req,res)=>{
  try{

  }
  catch(error){

  }
}


exports.forgotPasswordController=async(req,res)=>{
try{
  const {email,password}=req.body;
  const user=await User.findOne({email:email})
  if(!user){
    return res.status(204).json({
      sucess:false,
      message:"Your email is not registered"
    })
  }
  else{
    const hashedPassword = await bcrypt.hash(password, 10);
   user.password=hashedPassword;
    const savedUser = await user.save();

    return res.status(200).json({
      success: true,
      data: savedUser,
      message: "User password changed  successfully",
    });

  }

}
catch(error){
  console.log(error);
  res.status(500).json({
    sucess:false,
    message:"internal server error"
  })
}
}