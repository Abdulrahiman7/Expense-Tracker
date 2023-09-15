
const Expense=require('../model/expenseModel');
const sequelize=require('../util/database');

exports.postExpense=async (req, res, next)=> {
    const t=await sequelize.transaction();
    try
    {
        
        const exp=req.body;
        const x=await req.user.createExpense(exp,{transaction:t});
        req.user.totalExpense += +exp.amount;
        await req.user.save({transaction:t});

        t.commit();
        res.status(200).json(x[0]);
    }
    catch(err)
    {
        if(t)
        {
            t.rollback();
        }
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
    const t=seq.transaction();
    try{
        const id=req.params.id;
        const x=await Expense.findOne({where: {id:id}},{transaction:t});
        req.user.totalExpense -= +x.amount;
        await req.user.save({transaction:t});
        await Expense.destroy({where:{id:id}});

        t.commit();
        res.status(200).json(null);
    }
    catch(err)
    {
        if(t)
        {
            t.rollback();
        }
        console.log(err);
    }
}