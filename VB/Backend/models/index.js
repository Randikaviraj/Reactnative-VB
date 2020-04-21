const mongoose=require("mongoose");
const mongodb_url="mongodb://127.0.0.1:27017/game-of-thrones";




mongoose.connect(mongodb_url,{useNewUrlParser:true},(err)=>{
if(err){
    console.log('Erorr is here dbconnect..........'+err);
}else{
    console.log('Successfully connected to data base')
}
});


const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:',mongodb_url)
})

db.on('error', err => {
  console.error('connection error:', err)
})


module.exports={mongoose};