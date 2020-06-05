const express=require('express')
const router=express.Router()
const Post=require('../models/post')
 const auth =require('../Autherization/authuser')


router.post('/posts',auth,(req,res)=>{
    const {title,body} = req.body 
    if(!body || !title || !comments){
       return res.status(422).json({error:"please add all the fields"})
    }
let posts=new Post({...req.body,postedBy:req.user._id})
posts.save().then((yy)=>{
    res.status(201).send(yy)
}).catch((err)=>{
    res.status(500).send(err)
})
})



router.get('/posts',(req,res)=>{
  
 const {page=1,limit=10}=req.query;

  Post
  .find().
  limit(limit*1)
  .skip((page - 1) * limit)
  .sort('_id')
  .populate('postedBy',"_id name")
  .exec((err,airtical)=>{
        if(err)
        {
           res.status(500).send(err)
        }
        res.status(200).send(airtical)
  })
})


router.get('/getsubpost',requireLogin,(req,res)=>{

    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})



module.exports=router