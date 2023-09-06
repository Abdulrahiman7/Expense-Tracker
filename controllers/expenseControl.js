const Expense=require('../model/expenseModel')

exports.postExpense=async (req, res, next)=> {
    try
    {
        const x=await Expense.create(req.body);
        res.status(200).json(x[0]);
    }
    catch(err)
    {
        console.log(err);
    }
}

exports.getExpense=async (req, res, next)=>{
    try{
        const x=await Expense.findAll()
        res.status(200).json(x);
    }
    catch(err)
    {
        console.log(err);
    }
}