const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic: {
        type:String,
        default:"https://w7.pngwing.com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation-thumbnail.png"
    },
}, {timestamps:true}
);
module.exports = mongoose.model( "User", UserSchema );