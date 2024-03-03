const mongoose=require('mongoose')
require("dotenv").config()
const db=async()=>{
try{
await mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
console.log('mongodb connected')

}
catch(error){
console.log(error)
}
}

module.exports=db;