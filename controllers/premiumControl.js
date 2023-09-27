const Expense=require('../model/expenseModel');
const User=require('../model/user');
const sequelize = require('../util/database');
const AwsServices=require('../services/awsServices');
const Downloads=require('../model/downloads');


exports.getLeaderboard= async (req, res, next)=>{
  try{
    const usersLeaderboard = await User.findAll({
      attributes: ['email','name', 'totalExpense'],
      order: [['totalExpense', 'DESC']],
    });
  
    res.status(200).json({ arr: usersLeaderboard });
  }
    catch(err){
      res.status(404).json({message: 'internal server error'});
    }
      
}

exports.getReport=async (req, res, next)=>{
  try{
    const downloads=await Downloads.findAll({
      where:{email:req.user.email},
      attributes: ['URL','createdAt'],
      order: [['id', 'DESC']],
    });
  
    res.status(200).json({ arr: downloads });
  }
    catch(err){
      res.status(404).json({message: 'internal server error'});
    }
}
exports.downloadExpense= async (req, res, next)=>{
  try{
    const expenses=await Expense.findAll({where:{email:req.user.email}});
   const stringifiedExpense=JSON.stringify(expenses);
   const fileName= `${req.user.email}/${new Date()}.txt`;
   const bucketName='expense-tracker-v01';
   const fileURL=await AwsServices.uploadToS3(stringifiedExpense, fileName, bucketName);
   const x=await Downloads.create({URL:fileURL, email:req.user.email});
   if(x)
   {
    console.log('download created successfully');
   }
   res.status(200).json({url:fileURL});
  }
  catch(err)
  {
    console.log(err);
  }
}
