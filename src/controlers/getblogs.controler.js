import model from '../../scheem-model.js'
const getblogs= async(req,res)=>{
    try {
        const todos =await model.find({}).sort({ time: -1 })
        res.status(200).json({
            message:"blog fetched sussess ful",
            data:todos
        })
    } catch (error) {
        console.log(error)
    }
}

export{getblogs as default}
// cloudinary.config({ 
//     cloud_name: 'djf1tigyw', 
//     api_key: '117152564788648', 
//     api_secret: 'OvWS3KxSzfQ-E8L5LA1GgQfd9Sc' 
//   });
