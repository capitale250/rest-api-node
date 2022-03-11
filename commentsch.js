import mongoose from 'mongoose'
const { Schema } = mongoose;
const commenSchema = new Schema({
    body:  String,
    date: {
        type: Date,
        default: Date.now
     }, 

    // post: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'model'
    //  }
    
    
  
  });

const modelcom= new mongoose.model('comment', commenSchema)

export default  modelcom