const User= require('../model/user');

exports.createUser= async (req,res,next) => {
    try{
        console.log('entered')
        const user=User.create(req.body)
        res.status(200).json(user);
    }
    catch(err)
    {
        console.log(err);
    }
}