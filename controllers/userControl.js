const User= require('../model/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Sib=require('sib-api-v3-sdk');
const uuid=require('uuid');
const forgotPasswordRequests=require('../model/forgotPassword');
const sequelize = require('../util/database');



function generateToken(id)
{
    const token= jwt.sign({userId:id},'secretkey');
    return token;
}
exports.createUser= async (req,res,next) => {
    const t=await sequelize.transaction();
    try{
        const name = req.body.name;
const email = req.body.email;
const password = req.body.password;

if (name === '' || email === '' || password === '') {
    res.status(400).json({ message: 'Incomplete request data' });
} else {
    const find = await User.findAll({ where: { 'email': email } },{transaction:t});
    if (find.length > 0) {
        res.status(409).json({ message: 'User with this email already exists' });
    } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                
                console.error('Error hashing password:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                console.log('i have entered');
                const user = await User.create({ name, email, password: hash, premiumUser: false, totalExpense: 0},{transaction:t});
                console.log('user is created');
                const createForgot= await forgotPasswordRequests.create({uuid:null, active:false,email:email},{transaction:t});
               await t.commit();
                res.status(200).json(null);
                // Handle bcrypt hashing errores.status(200).json(user);
            }
        });
    }
}

    }
    catch(err)
    {
        await t.rollback();
        console.log(err);
    }
}

exports.loginUser=async (req,res, next)=> {
    try{
        if(req.body.email =='' || req.body.password =='')
        {
            res.status(204).json(null);
        }else{
            const user=await User.findAll({where: {'email':req.body.email}})
            if(!user[0])
            {
                res.status(404).json(null);
            }else{
                const foundUser = user[0].get({ plain: true });
                console.log(foundUser.password);
                console.log(req.body.password)
              const x= await bcrypt.compare( req.body.password, foundUser.password)
              if(x){
                const token=generateToken(user[0].email);
               res.status(200).json({'token':token});
              }else{
                res.status(403).json({message:'incorrect password'});
              }
            }
        }
    }
    catch(err)
    {
        res.status(403).json({message: 'password incorrect'});
        console.log(err);
    }
}

exports.forgotUser= async (req,res,next)=>{
    const email=req.body.email;
try
{
    const client=Sib.ApiClient.instance;
    const apiKey=client.authentications['api-key'];
    apiKey.apiKey=process.env.BREVO_API_KEY;

const id=uuid.v4();
const [affectedRows, updateResponse]=await forgotPasswordRequests.update({uuid:id, active:true},{where:{email:email}})
if(affectedRows!=0)
{
const tranEmailApi=new Sib.TransactionalEmailsApi();
const sender={
    email:'abd27u@gmail.com'
}
const reciever=[
    {
        email:email
    }
];
console.log(id);
const resetLink=`http://13.234.19.1/forgotpassword/${id}`;
console.log(resetLink);
await tranEmailApi.sendTransacEmail({
    sender,
    to:reciever,
    subject: 'RESET PASSWORD LINK',
    textContent:'Please do no share this link with anyone for security purpose',
    htmlContent:`<a href=${resetLink}>Click Here to reset your password</a>`
})
res.status(200).json({message: 'Reset Email sent Successfully'});
}else{
    res.status(204).json({
        message: 'Email not registered'
    });
}

}
catch(err){
    console.log(err);
}
}

exports.postForgotUser=async (req, res , next) =>{
try{
    const id=req.params.id;
    console.log(id);
    const x=await forgotPasswordRequests.findOne({where:{uuid:id}}); 
    if(x)
    {
        if(x.active == false)
    {
        console.log('entered false');
        res.status(204).json({message: 'Link has expired'});
    }else{

        const y=await forgotPasswordRequests.update({active:false}, {where:{email:x.email}})
        const token=generateToken(x.email);
        res.status(200).redirect(`http://13.234.19.1/resetPassword.html?token=${token}`);
    }
    }
}
catch(err)
{
    console.log(err);
}
}

exports.changePassword= async (req, res, next) =>{
    
    const token=req.query.token;
    let email;
    jwt.verify(token,'secretkey',(err, decoded)=>{
        if(err)
        {
            console.log(err);
        }else{
            email=decoded.userId;
        }
    })
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            
            console.error('Error hashing password:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            const user = await User.update({password: hash },{where:{email:email}});
            console.log('user is updated');
            res.status(200).json({message: 'successfully changed password'});
            // Handle bcrypt hashing errores.status(200).json(user);
        }
    })
}

