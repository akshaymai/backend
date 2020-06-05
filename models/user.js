const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const validator=require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:validator.isEmail,
        Message:'{VALUE} is not a valid Email'
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    address:{

        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})



 userSchema.pre('save',async function (next){
    var user=this;
   if(user.isModified('password')){
   user.password=await bcrypt.hash(user.password,8)
   }
next()

 })


const User=mongoose.model("User",userSchema,'User')
module.exports={User}