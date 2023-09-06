const User= require('../model/user');
const bcrypt = require('bcrypt');
exports.createUser= async (req,res,next) => {
    try{
        const name = req.body.name;
const email = req.body.email;
const password = req.body.password;

if (name === '' || email === '' || password === '') {
    res.status(400).json({ message: 'Incomplete request data' });
} else {
    const find = await User.findAll({ where: { 'email': email } });
    if (find.length > 0) {
        res.status(409).json({ message: 'User with this email already exists' });
    } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                // Handle bcrypt hashing error
                console.error('Error hashing password:', err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                const user = await User.create({ name, email, password: hash });
                res.status(200).json(user);
            }
        });
    }
}

    }
    catch(err)
    {
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
                if(foundUser.password === req.body.password)
                {
                    res.status(200).json(user[0])
                }else{
                    res.status(403).json(null);
                }
            }
        }
    }
    catch(err)
    {
        console.log(err);
    }
}