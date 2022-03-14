import express from 'express'
import User from '../modules/user.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from './config.js'
import {parserError} from '../config/errorhandles.js'
var router = express.Router();

export class Authorrize{
  static login (req, res){
    const email ={email: req.body.email}
    console.log(email)
  
    User.findOne({ email: req.body.email }, (err, user)=> {
      if (err){console.log (err); return res.status(500).send(`Error on the server${err} `);}
      if (!user) return res.status(404).send(`No user found.`);
      console.log('1')
      console.log(req.body.password)
      console.log(user.password)
      console.log(user)
     
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
  
  
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 
      });
  
  
      res.status(200).send({ auth: true, token: token });
    });
  
  };
  
  // router.get('/logout', (req, res)=> {
  //   res.status(200).send({ auth: false, token: null });
  // });
  
  static register(req, res) {
      console.log('lets go')
      User.findOne({email:req.body.email},(err,user)=>{
        if (user) return res.status(404).send(`user with ${req.body.email} allready  found` );
        if (err) return res.status(400).send(` insert the user email` );
      
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      console.log(hashedPassword)
      const usre={
          name : req.body.name,
          email : req.body.email,
          password : hashedPassword
      }
  
  
  
    User.create(usre, (err, user)=> {
      
       if (err) return res.status(500).send(parserError(err));

      //`There was a problem registering${err.message} the user ${err.errors.email}.`
  
    
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
  
      res.status(200).send({ auth: true, token: token });
      // res.status(201).json({
      //     message:"user created",
      //     data:user,
      // })
    });
  })
  
  };
  
  // static getuser=('/getuser/:id', VerifyToken, function(req, res, next) {
    static getuser = function(req, res, next) {
    const id =req.params.id
  
    User.findById(id, { password: 0 }, function (err, user) {
      if (err) return res.status(500).send(`There was a problem finding the user ${err}.`);
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
    
    });
  
  };
  
  static delete = async (req,res,next)=>{
      const id = req.params.id
      try {
          const todo =await User.findByIdAndDelete(id,{
              ...req.body
          })
          res.status(200).json({
              message:"user deleted successfully",
  
          })
      } catch (error) {
          console.log(error)
      }
  }

}


