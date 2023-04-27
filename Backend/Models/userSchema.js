const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    gsuit:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    confirm_password:{
        type: String,
        required:true
    },
    token: {
        type: String
      }
})

const User = mongoose.model('USER', userSchema );

module.exports = User;