// const express = require('express');
import express from 'express'
import cors from'cors'
import mongoose from 'mongoose'
import model from './scheem-model.js'
import modelcom from './commentsch.js'
// import router from './src/routes/blog.route.js'
// import authroutes from './src/routes/auth.route.js'
import router from './src/routes/allroutes.js'
import config from './config.js';
console.log(config)
 //const {Port} = config|| undefined ;


mongoose.connect("mongodb+srv://capitale:987poi@cluster0.jcaob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",(Err,resu)=>{
    if(resu){
        console.log('Connected to the DB 🔥')
    } else{
        console.log(Err)
    }
    

})
const app = express();

app.use(cors())
app.use(express.json())
app.use(router)




//const port = process.env.PORT||Port || 3000;
const port = process.env.PORT|| 3000;




  
//   app.get('/getAllblogs',async(req,res)=>{
//     try {
//         const blog =await model.find({}).sort({ time: -1 })
//         res.status(200).json({
//             message:"blog fetched sussess ful",
//             data:blog
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })

// // GET ONE blog
// app.get('/getOneblog/:id',async (req,res)=>{
//     console.log('hi')
//     const id = req.params.id
//     try {
//         const todo =await model.findById(id)
//         res.status(200).json({
//             message:"blog fetched sussess ful",
//             data:todo
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })



// // UPDATE
// app.put('/update/:id',async (req,res)=>{
//     const id = req.params.id
//     console.log(id)
//     try {
//         const todo =await model.findByIdAndUpdate(id,{
//             ...req.body
//         })
//         res.status(200).json({
//             message:"update successfully",

//         })
//     } catch (error) {
//         console.log(error)
//     }
// })

// // DELETE
// app.delete('/delete/:id',async (req,res)=>{
//     const id = req.params.id
//     try {
//         const todo =await model.findByIdAndDelete(id,{
//             ...req.body
//         })
//         res.status(200).json({
//             message:"blog deleted successfully",

//         })
//     } catch (error) {
//         console.log(error)
//     }
// })

// app.post('/creatcommentblog/:id',async(req, res) => {
//     const id =req.params.id
//     const commentData = [{ 
//         Username: req.body.username,
//         Email: req.body.email,
//         Comment:req.body.comment,
//         CommentDate: new Date()
//     }]
//     model.findByIdAndUpdate(id, {

//     $push:{ "Comments": commentData}
//      } ,  
//    function(err, comment) {
//     if (err){
//         res.json(err);
//     }else{
//         res.json(comment)
//     }   
//       }
//    );
   
    

//   })
// app.delete('/managecomment/:id',async(req,res)=>{
//     const id=req.params.id
//     function checkid(id) {
//         return  != 
//     }

// })
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, function() {
        console.log(`Example app listening on port ${port}!`)
      });}


export default app
