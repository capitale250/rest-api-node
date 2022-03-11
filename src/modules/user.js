import mongoose from 'mongoose';
const { Schema } = mongoose;
var UserSchema = new Schema({  
  name: String,
  email: {type:String, required:[true, "Email is required"]},
  password: String
});
const model= mongoose.model('User', UserSchema);

export default model