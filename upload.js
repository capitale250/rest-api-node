import multer from 'multer'
import 'fs'
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        console.log(file.fieldname)
        if(file.fieldname){
            cb(null, process.cwd() + '/src/public/images/articles')
       
        }else{
            console.log('fieldname not maching');
            
        }
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
export const upload = multer({ storage: storage })