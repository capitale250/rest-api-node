import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}  type: mongoose.Schema.Types.ObjectId,
  // ref: 'modelcom'
  author: String,
  discription: String,
  FeaturedImage: String,
  date: { type: Date, default: Date.now },
  Comments: Array,
  

});
const model= new mongoose.model('post', blogSchema)

export default  model