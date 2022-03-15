import {articlesModel} from '../modules/models.js'


export class Comments{
    static getComments(req, res) {
        const commentsContainer = []
        var counter = 0
        var commentsProjection = { 
            
            Comments: true
        };
        articlesModel.find( {},commentsProjection ,function(err, comments) {
            if (err)
                res.send(err)
            console.log(comments)
            
            
            comments.forEach((doc) =>{
                // console.log('hello')
                 console.log(doc.Comments);
                // res.json(doc.Comments);
                doc.Comments.forEach(docs => {
                    if(docs.Username){
                        commentsContainer.push(docs)
                        counter +=1
                    }
                })

            })
            console.log(counter)
            console.log(commentsContainer);
            commentsContainer.push({"size":counter})
            res.json(commentsContainer);
        });
    }
    // create a new comment
    static createComment(req, res) {
        const id = req.query.id
        console.log(id)
        if(!id){
            res.json({message:"post id error"})
        }else if(!req.body.comment){
            res.json({mesage:"message null"})
        }else if(!req.body.username){
            res.json({mesage:"enter user name"})
        }else if(!req.body.email){
            res.json({mesage:"enter user email"})   
        }else{
            const commentData = { 
                        Username: req.body.username,
                        Email: req.body.email,
                        Comment:req.body.comment,
                        CommentDate: new Date()
                    }
            articlesModel.findByIdAndUpdate(id, {
                
                $push:{ "Comments": commentData}
                }, 
                function(err, comment) {
                    if (err){
                        res.json(err);
                    }else{
                        res.json(comment)
                    }   
                }
            );   
        }
    }
    static deleteComment(req,res) {
       
            const id =  req.query.id
            const comment = req.body.email
            var cdate = req.body.commentDate
            cdate = new Date(cdate)
            console.log(comment);
            console.log(cdate);
            
            if(!id){
                res.json({code:2})
            }else{
                articlesModel.findByIdAndUpdate(id, 
                    {$pull:
                        {Comments:
                            
                                {CommentDate: cdate}

                            }
                        
                        },
                    (err, result) =>{
                        if(err) console.log("DeleteErr[Comment]:" + err)
                        res.json(result)
                    }
                )
            }
       
    }
}
// list all contacts
