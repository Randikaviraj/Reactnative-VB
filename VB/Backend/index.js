const express=require('express');
const bodyParser=require("body-parser");
const path = require("path");

const app=express();


const {mongoose}=require('./models/index')
const usercontroler=require("./controlers/usercontrol");


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/user',usercontroler)

app.listen(3330,()=>{
    console.log('Serever is listening');
})

