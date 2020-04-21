const express=require('express')
const mongoose=require("mongoose");
const _ = require('lodash');
const bcrypt=require('bcrypt');
const {User}=require('../models/user')
const router=express.Router();
var nodemailer = require('nodemailer');
var multer  = require('multer')
const path = require("path");

mongoose.set('useFindAndModify', false);


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

router.post('/changepassword',(req,res)=>{
    var password= bcrypt.hashSync(req.body.password, 10);
   
    User.findOneAndUpdate({email:req.body.email}, { password:password }, function(err, result) {
        console.log(req.body.email)
        console.log(password )
        if (err) {
            console.log(err)
            res.status(400).send(JSON.stringify({status:false,network:true}));
        } else {
          console.log(result)

          res.send(JSON.stringify({status:true,network:true}));
        }
      });
})

router.post('/signup',(req,res)=>{
   
   const data={
        fristname:req.body.fname,
        lastname:req.body.lname,
        email:req.body.email,
        password:req.body.password
   }
   
    const user=new User(data)
    console.log(user)
    user.save().then((user)=>{
        if(user){
            res.send({statussignup:true,network:true})
        }else{
            res.status(400).send({statussignup:false,network:true})
        }
    }).catch((err)=>{
        res.status(400).send({statussignup:false,network:true})
        console.log(err)})
    
    
})

router.post('/login',(req,res)=>{

        console.log(req.body.email)
        User.find({email:req.body.email}).then(doc=>{
            if(!_.isEmpty(doc)){
                    console.log(doc)
                    bcrypt.compare(req.body.password, doc[0].password).then(function(result) {
                        console.log(result)
                            if(result){
                                let temp={
                                    user:doc[0],
                                    statussignin:true,
                                    network:true
                                }
                                res.send(temp)
                            }else if(!result){res.end(JSON.stringify({statussignin:false,network:true}));}
                    })
            }else{  res.end(JSON.stringify({statussignin:false,network:true}));}
                    
        }).catch(err=>{
            console.log('Eror is in here login '+err)
        });
})


router.post('/uploadimage',upload.single('photo'),(req,res,next)=>{

    try{
        
        console.log(req.file)
        res.send(JSON.stringify({status:true,network:true}));
          
    }catch(err){
        console.log(err)
        res.status(400).send(JSON.stringify({status:false,network:true}));
    }
    
    
})

router.post('/updateprofile',(req,res)=>{
   
    User.findOneAndUpdate({email:req.body.email}, { fristname:req.body.fname,lastname:req.body.lname, }, function(err, result) {
        if (err) {
            console.log(err)
            res.status(400).send(JSON.stringify({status:false,network:true}));
        } else {
          console.log(result)

          res.send(JSON.stringify({status:true,network:true}));
        }
      });
})

router.post('/forgetemail',(req,res)=>{
    

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nilminisenanayakesuba@gmail.com',
        pass: 'asdk'
    }
    });

    var mailOptions = {
    from: 'youremail@gmail.com',
    to: req.body.email,
    subject: 'Password reset confirmation',
    text: 'Your Password reset confirmation no is'+req.body.num
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('Error in sending email '+error);
        res.status(400).send(JSON.stringify({statusrenew:false,network:true}));
    } else {
        console.log('Email sent: ' + info.response);
        res.send(JSON.stringify({statusrenew:true,network:true}));
    }
    }); 
})


router.get('/profilepic', function (req, res) {
   
    res.sendFile(path.resolve('../uploads/randikavirajmax@gmail.jpg'));
});

module.exports=router;