const Users=require("../models/Usermodel");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const createaccesstoken=(payload)=>{
    return jwt.sign(payload,process.env.SECRET_TOKEN,{expiresIn:"1d"});
}
const createrefreshtoken=(payload)=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN,{expiresIn:"7d"});
}
const usercontrol={
    register:async(req,res)=>{
        try {
            const {Id,name,email,password,role}=req.body;

            const user=await Users.findOne({'email':email});
            if(user) return res.status(400).json({message:"email already registered"});

            if(password.length<8) return res.status(400).json({message:"password must be of 8 character"});

            const hashpassword=await bcrypt.hash(password,10);
            const newuser=new Users({
                Id,name,email,password:hashpassword,role
            })
            await newuser.save();


            res.status(200).json({message:"registered"})

        } catch (error) {
            res.status(500).json({'error':error.message});
            
        }
    },
    login:async(req,res)=>{
        try {
            const {email,password}=req.body;
            
            const user=await Users.findOne({'email':email})
       
           
            
            if(!user) return res.status(400).json({message:"email id is not registered"});
            
            const ismatch=await bcrypt.compare(password,user.password);
           
            if(!ismatch) return res.status(400).json({message:"password is wrong"});

            const accesstoken=createaccesstoken({id:user._id});
            const refreshtoken=createrefreshtoken({id:user._id});

            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                secure:false,
                sameSite: 'Lax'
                path:"/user/refreshtoken"
            });
            res.status(200).json({accesstoken});            
        } catch (error) {
            res.status(500).json({"error":error.message})
        }
    },
    refresh:async(req,res)=>{
        try {
            const rf_token=req.cookies.refreshtoken;
            
            
            if(!rf_token) return res.status(400).json({message:"please login"});

            await jwt.verify(rf_token,process.env.REFRESH_TOKEN,(error,user)=>{
                if(error) return res.staus(400).json("please login");
                const accesstoken=createaccesstoken({id:user.id});
                res.status(200).json({user,accesstoken})
            })
        } catch (error) {
            res.status(500).json({'error':error.message});
        }
    },
    logout:async(req,res)=>{
        res.clearCookie('refreshtoken',{path:"/user/refreshtoken"});
        res.json("logout successfully");
    },
    getuser:async(req,res)=>{
        try {
            const id=req.user.id;
            
            
            const user=await Users.findById(id).select('-password');
            if(!user) return res.status(400).json({message:"user not found"})
            res.json({user});
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    },
    getallusers:async(req,res)=>{
        try {
            const users=await Users.find({}).select('-password');
            const filteredusers=users.filter(user=>user.role!==1)
            res.status(200).json({users:filteredusers})
            
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    },
    update:async(req,res)=>{
        try {
            const id=req.params.id;
        const user=await Users.findOne({Id:id});
        const newtask=req.body;
                   
        await Users.findByIdAndUpdate(user._id,{ $push: { tasks: newtask }, $inc: {"taskcount.new_task": 1} });
        res.json('updated')
        } catch (error) {
            res.status(500).json({error:error.message})
        }
        
    },
    accept:async(req,res)=>{
        try {
            const id=req.params.id;
            const {title}=req.body;
            const user=await Users.findOne({Id:id});
            const task=user.tasks.find(task=>task.title===title);
            if(!task.new_task) return res.status(400).json("task is not newtask");
            await Users.findByIdAndUpdate(user._id,{ $inc: { 
                "taskcount.active": 1 ,
                "taskcount.new_task": -1
            }
                 })
                await Users.findOneAndUpdate(
                    { _id: user._id, "tasks.title": title },
                    { $set:{ "tasks.$.active": true,
                        "tasks.$.new_task": false 
                     },},
                     {new:true}
                  );
                
            res.status(200).json('updated');
        } catch (error) {
         res.status(500).json({error:error.message,errorstack:error.stack})   
        }
        
    },
    complete:async(req,res)=>{
        try {
            const id=req.params.id;
            const {title}=req.body;
            const user=await Users.findOne({Id:id});
            const task=user.tasks.find(task=>task.title===title);
            if(!task.active) return res.status(400).json("task is not active");
            await Users.findByIdAndUpdate(user.id,{$inc: {
                "taskcount.active": -1,
                "taskcount.completed": 1
            }
            })
            await Users.findOneAndUpdate({_id:user._id,"tasks.title": title},{ $set: {
                "tasks.$.active":false,
                "tasks.$.completed":true
            }})
            res.json("completed")
        } catch (error) {
            res.status(500).json({error:error.message})
        }
       
    },
    failed:async(req,res)=>{
        try {
            const id=req.params.id;
            const {title}=req.body;
            const user=await Users.findOne({Id:id});
            const task=user.tasks.find(task=>task.title===title);
            if(!task.active) return res.status(400).json("task is not active");
            
            await Users.findByIdAndUpdate(user.id,{$inc: {
                "taskcount.active": -1,
                "taskcount.failed": 1
            }
            })
            await Users.findOneAndUpdate({_id:user._id,"tasks.title": title},{ $set: {
                "tasks.$.active":false,
                "tasks.$.failed":true
            }})
            res.json("failed")
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
}

module.exports=usercontrol