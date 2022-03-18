import {articlesModel} from '../modules/models.js'

import {parserError} from '../config/errorhandles.js'
import {bearerHeader} from '../config/verify.js'
import jwt from 'jsonwebtoken'

export class Articles{
    static getArticles(req, res) {
        var id = req.query.id

        if (id) {
            articlesModel.findById(id, (err, articleData) =>{
                if(err){
                    res.send(err)
                }
                res.send(articleData)
            })
        }else{
            console.log(bearerHeader)
            articlesModel.find(function(err, articles) {
                if (err)
                    res.send(err)
                res.json(articles);
                //console.log('Articles returned')
            });
        }
    }
    
   
    static createArticle(req, res, next) {
      
                const file = req.file
                
                if (!file) {
                    const error = new Error('Please upload a file')
                    error.httpStatusCode = 400
                    return next(error)
                }
                // res.setHeader('Content-Type', 'application/json')
                console.log(req.body.title)
                console.log(req.body.description)
                articlesModel.findOne({ Title: req.body.title}, (err, blog)=> {
                   if (blog){console.log (blog); return res.status(500).send(`blog allready on the server with tiltle${req.body.title} `);}
                   else{
                   articlesModel.create({
                    Title : req.body.title,
                    FeaturedImage : req.file.path  /*'images/kbs.jpg'*/,
                    Description :req.body.description ,
                    PostDate: new Date()
                    }, 
                   function(err, article) {
                    if (err){
                        res.json(parserError(err));
                    }else{
                        res.json(article)
                        
                        }   
                     }
              )}})
            
        
               
    }
    //update an article
    static updateArticle(req, res) {
        
                const file = req.file
                //console.log(req.file)
                var id = req.body.id
                if (!file) {

                    var data ={
                        Title : req.body.title/*'NodeJS, Express, MongoDB and Mongoose'*/,
                       
                        Description :req.body.description,
                        PostDate: new Date()
                    }
                    res.setHeader('Content-Type', 'application/json')
                    articlesModel.findByIdAndUpdate(id, data, 
                        function(err, article) {
                            if (err){
                                res.send(err);
                            }else{
                                res.json(article)
                             
                            }   
                        }
                    );
                }else{
                    var data ={
                        Title : req.body.title,
                        FeaturedImage : req.file.path  ,
                        Description :req.body.description ,
                        PostDate: new Date()
                    }
                    
                    res.setHeader('Content-Type', 'application/json')
                    articlesModel.findByIdAndUpdate(id, data, 
                    function(err, article) {
                        if (err){
                            res.send(err);
                        }else{
                            res.json(article)
                           
                        }   
                    });
                }
                
            
            }

    
    static deleteArticle(req, res) {
       
                var id = req.body.id
                //console.log('id:' + id);
                if (id) {
                    articlesModel.findByIdAndDelete( id, (err, articleData) =>{
                        if(err){
                            res.send(err)
                        }
                        res.send(articleData)
                    })
                }else{
                    res.json({message: "Provide id"})
                }
            }
}
