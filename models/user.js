const mongoose = require("mongoose")
// const bcrypt = require('bcrypt');
//define the user schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,   
    },
    address:{
        type:String,
        required:true,   
    },
    adhaarCardNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        tyoe:String,
        required:true,
    },
    role:{
        tyoe:String,
        enum:['voter','admin'],
        default:'voter'
    },
    isVoted:{
        tyoe:Boolean,
        default:false,
    }
})

const User= mongoose.model('User',userSchema);
module.exports=User;