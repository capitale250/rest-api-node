import model from '../../scheem-model.js'
const postblog=async(req, res) => {
    try {
        const result = await model.create({
            title:req.body.title,
            author:req.body.author,
            FeaturedImage : '/images/articles/' + req.file.filename ,
            discription:req.body.discription ,
         
          

        })
        res.status(201).json({
            message:"check item created successfully",
            data:result
        })
    } catch (error) {
        console.log(error)

    }}

    export{postblog as default}