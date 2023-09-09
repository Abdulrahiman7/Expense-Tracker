const Expense=require('../model/expenseModel')

exports.postExpense=async (req, res, next)=> {
    try
    {
        const exp=req.body;
        exp.userEmail=req.email;
        const x=await Expense.create(exp);
        res.status(200).json(x[0]);
    }
    catch(err)
    {
        console.log(err);
    }
}

exports.getExpense=async (req, res, next)=>{
    try{
        const x=await Expense.findAll({where:{userEmail:req.email}})
        res.status(200).json(x);
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