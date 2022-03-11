import multer from 'multer'
import cloudinary from 'cloudinary';
// import  {CloudinaryStorage} from 'multer-storage-cloudinary'

import 'fs'
import pkg from 'multer-storage-cloudinary';
const {CloudinaryStorage} = pkg;

// cloudinary.config({
//     cloud_name: 'djf1tigyw', 
//     api_key: '117152564788648', 
//     api_secret: 'OvWS3KxSzfQ-E8L5LA1GgQfd9Sc'
// });
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: "DEVelope",
//     },
    
//   });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       
        if(file.fieldname == 'article_image'){
            cb(null, process.cwd() + '/src/public/images/articles')
        }else if(file.fieldname == 'project_image'){
            cb(null, process.cwd() + '/src/public/images/projects')
        }else if(file.fieldname == 'skill_image'){
            cb(null, process.cwd() + '/src/public/images/skills')
        }else if(file.fieldname == 'profile_image'){
            cb(null, process.cwd() + 'src/public/images/profile')
        }else{
            console.log('fieldname not maching');
            
        }
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
export const upload = multer({ storage: storage })