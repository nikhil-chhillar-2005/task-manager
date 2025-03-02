const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    Id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        required:true
    },
    tasks:{
        type:Array,
        default:[]
    },
    taskcount:{
        type:Object,
        default:{
            new_task:0,
            completed:0,
            failed:0,
            active:0
        }
    },

});

module.exports=mongoose.model("user",userschema);