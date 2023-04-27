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
    id:{
        type: String,
        required:true
    },
    semester:{
        type: String,
        required:true
    },
    department: {
        type: String,
        required:true
      }
})

const User = mongoose.model('USER', userSchema );

module.exports = User;