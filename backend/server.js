const express=require('express');
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
    origin: (origin, callback) => {
        callback(null, origin || '*'); // Allow all origins dynamically
    },
    credentials:true
}));

app.use('/user',require('./router/userRoute'))

app.listen(PORT,()=>{
    console.log('server running on port ',PORT);
})


// db connection

const url=process.env.MONGODB_URL;  
mongoose.connect(url).then(()=>{
    console.log("mongodb connected");
    
}).catch(err=>{
    console.log(err);
    
})