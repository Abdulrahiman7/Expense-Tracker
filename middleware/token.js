const jwt=require('jsonwebtoken');

exports.authorize= async (req,res,next) =>{
    const key='secretkey';
    const token=req.headers['authorization'];
    console.log(token);
    try{
        const auth=jwt.verify(token, key);
        console.log(auth.userId)
        req.email=auth.userId;
        next()
    }
    catch(err){
        console.log(err);
    }
}