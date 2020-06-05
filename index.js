require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const port=process.env.PORT || 4000;

 




app.use(express.json())


// DB Connection//
mongoose.connect(process.env.mongo_url,{useCreateIndex:true,useFindAndModify:true,useNewUrlParser:true,useUnifiedTopology:true})
mongoose.connection.on('connected',()=>{
    console.log('connected sucessfully')
})
mongoose.connection.on('error',(err)=>{
    console.log(' not connected ',err)
})
//



app.use('/',require('./Router/user'))
app.use('/',require('./Router/post'))






app.listen(4000,()=>{
    console.log(`server is running on port ${port}`)
})