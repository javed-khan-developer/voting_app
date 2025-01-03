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
userSchema.pre('save', async function (next) {
    const user = this;
    //hash the password only if it is modified or it's new
    if (!user.isModified('password')) return next();
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10)
        //hash password
        const hashedPassword = await bcrypt.hash(user.password, salt)
        //override the plain password with hashed one 
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        //use the bcrypt to compare the provided password with hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password)
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const User= mongoose.model('User',userSchema);
module.exports=User;