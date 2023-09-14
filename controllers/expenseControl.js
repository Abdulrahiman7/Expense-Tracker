const Expense=require('../model/expenseModel')

exports.postExpense=async (req, res, next)=> {
    try
    {
        const exp=req.body;
        const x=await req.user.createExpense(exp);
        res.status(200).json(x[0]);
    }
    catch(err)
    {
        console.log(err);
    }
}

exports.getExpense=async (req, res, next)=>{
    try{
        const x=await Expense.findAll({where:{email:req.user.email}})
    
        res.status(200).json({exp:x, prime:req.user.premiumUser});
    }
    catch(err)
    {
        console.log(err);
    }
}

exports.deleteExpense= async (req,res,next) =>{
    try{
        const id=req.params.id;
        const x=await Expense.destroy({where:{id:id}})
        res.status(200).json(null);
    }
    catch(err)
    {
        console.log(err);
    }
}