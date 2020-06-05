const jwt=require('jsonwebtoken')
const {User}=require('../models/user')
require('dotenv').config()
 
 
    const auth=async(req,res,next)=>{
        try {
        const token=req.header('Authorization')
        const decode=jwt.verify(token,process.env.jwt_secret)
        const user=await User.findOne({_id:decode._id})
        if(!user)
        {
            throw new Error('User is not found') 
        }
       
        req.user=user;
        next();
        }
     catch (error) {
         res.status(401).send('Your Token is invalide!!!')
        next();
    }
    }


  module.exports=auth