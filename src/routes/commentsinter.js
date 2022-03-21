import {articlesModel} from '../modules/models.js'

export class Commentsint{
    static  async commint(req,res){
        const allinterface = [];
       await articlesModel.find((err, articles)=> {
            if (err)
                res.send(err)
            
            // console.log(articles)
            articles.forEach(doc=>{
                // console.log(doc.Comments)
                doc.Comments.forEach(commb=>{
                    console.log(commb)
                })
                
            })
           
            //    doc.Comments.forEach(
            //        comm =>{
            //            console.log(doc+'++++++' )
            //            console.log(doc.Comments+'++++++' )
            //            console.log(comm+'++++++' )
            //        }
            //    )
            //    allinterface.push(articles)
            //    allinterface.push(doc.Comments)
            //    res.send(allinterface)
            // }

            // )

    })
}
}
