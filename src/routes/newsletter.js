import {newsletterModel} from '../modules/models.js'


import jwt from 'jsonwebtoken'

export class Newsletter{
    static getNews(req, res) {
      
            var id = req.body.id
 
            
            if(id){
               
                    
                    newsletterModel.findById(req.body.id,(err, email)=>{
                        if(err) 
                            return res.send({message:"DbErr", Error:err})
                            console.log(err)
                        return res.json(email)
                        
                        
                    })
           
            }
     
                newsletterModel.find(function(err, emailInfo) {
                    if (err)
                        return res.send(err)
                    return res.json(emailInfo);
                    //console.log('Newletter returned')
                });
            // }catch(err){
            //     throw err
            // }
            
        // }
        }
        
            
       
    // }
    // Create newsletter
    static createNewsletter(req, res) {

                //console.log(req.body.email);
                try{
                    newsletterModel.create({
                        
                        Email : req.body.email,
                        
                        RequestDate: new Date()
                        }, 
                        function(err, emailInfo) {
                            if (err){
                                return res.json(parserError(err));
                            }else{
                                return res.json(emailInfo)
                                
                               
                            }   
                        }
                    );
                }catch(err){
                    throw err
                }
                
            }

    static deleteNewsletter(req, res) {

                var id = req.body.id
                try{
                    newsletterModel.findByIdAndDelete(id, 
                        function(err, emailInfo) {
                            if (err){
                                return res.json(parserError(err));
                            }else{
                               return res.json(emailInfo)
                               
                            }   
                        }
                    );
                }catch(err){
                    throw err
                }
                
            }
        }
