const User= require('../model/user');

exports.createUser= async (req,res,next) => {
    try{
        if(req.body.name =='' || req.body.email =='' || req.body.password =='')
        {
            res.status(204).json(null);
        }else{
        const find=User.findAll({where:{'email': req.body.email}})
        if(find[0]==null)
        {
            res.status(208).json(find[0]);
        }else{
        const user=User.create(req.body)
        res.status(200).json(user);
        }
        }
    }
    catch(err)
    {
        console.log(err);
    }
}