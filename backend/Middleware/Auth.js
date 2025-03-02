const jwt=require('jsonwebtoken');

const Auth=(req,res,next)=>{
    try {
        
        const token=req.header('Authorization');
        if(!token){
            return res.status(400).json({error:'Invalid Autharization'});
        }

        jwt.verify(token,process.env.SECRET_TOKEN,(err,user)=>{
            if(err) return res.status(400).json({err:'invalid authentication'});
        req.user=user;
        next();
        });
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports=Auth;
