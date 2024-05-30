const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
      }, 
      email:{
        type: String,
        required: true,
        unique: true
      },
      age: {
        type : Number,
        required : true
      },
      mobile: Number,
      add :{
        type: String,
        required: true,
      }, 
      occ :{
        type: String,
        required: true,
      }, 
      desc:{
        type: String,
        required: true,
      }, 
  });

  const users = mongoose.model('users', userSchema);

  module.exports = users