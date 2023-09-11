const jwt=require('jsonwebtoken');
const User=require('../model/user')

exports.authorize= async (req,res,next) =>{
    const key='secretkey';
    const token=req.headers['authorization'];
    console.log(token);
    try{
        const auth=jwt.verify(token, key);
        User.findByPk(auth.userId)
        .then((user)=>{
            console.log('entered')
            req.user=user;
             next()
        })
        .catch(()=>{
            throw new Error();
        })
    }
    catch(err){
        console.log(err);
    }
}