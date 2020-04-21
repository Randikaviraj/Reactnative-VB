const mongoose=require('mongoose')
const bcrypt=require('bcrypt');
const _ = require('lodash');




const userSchema=new mongoose.Schema({
    fristname:{
        type:String,
        trim:true,
        required:true
    },
    lastname:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    // img: { data: Buffer, contentType: String }

})


userSchema.pre('save',function(next){
    const user=this

    if(user.isModified('password')){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                user.password=hash;
                next();
            });
        });

    }else{
        return next();
    }
})

const User=mongoose.model('User',userSchema);
module.exports={User}

