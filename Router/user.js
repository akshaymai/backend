const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
const {User}=require('../models/user')
const jwt=require('jsonwebtoken')
require('dotenv').config()


router.post('/register',async(req,res)=>{
    const {name,email,password,address} = req.body 
    if(!email || !password || !name){
       return res.status(422).json({error:"please add all the fields"})
    }

let checkemail=await User.findOne({email:req.body.email})
if(checkemail){
 return res.status(404).send('alredy registerd')
}
let newuser=new User(req.body)
newuser.save().then((yy)=>{
    res.status(201).json({
        "message": "new user created",
        "user":yy
    })
}).catch((err)=>{
    res.status(500).send(err)
})
})





router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
               const token = jwt.sign({_id:savedUser._id},process.env.jwt_secret)
               const {_id,name,email} = savedUser
               res.status(200).json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


module.exports=router