const express=require('express');
const path =require('path');
const app=express();
const mongoose=require('mongoose')
require('dotenv').config();
const cookieparser=require('cookie-parser')
const cors=require('cors');
const PORT=process.env.PORT||8000;
//middleware

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    credentials:true,
}));

app.use('/user',require('./router/userRoute'))

app.listen(PORT,()=>{
    console.log('server running on port ',PORT);
})

app.use(express.static(path.join(__dirname,"../client/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/","build","index.html"));
})

// db connection

const url=process.env.MONGODB_URL;  
mongoose.connect(url).then(()=>{
    console.log("mongodb connected");
    
}).catch(err=>{
    console.log(err);
    
})