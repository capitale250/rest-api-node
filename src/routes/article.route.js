import {articlesModel} from '../modules/models.js'


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
                articlesModel.create({
                    Title : req.body.title,
                    FeaturedImage : '/images/articles/' + req.file.filename /*'images/kbs.jpg'*/,
                    Description :req.body.description ,
                    PostDate: new Date()
                }, 
                function(err, article) {
                    if (err){
                        res.json(err);
                    }else{
                        res.json(article)
                        
                    }   
                }
             );
               
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
                        FeaturedImage : '/images/articles/' + req.file.filename ,
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
