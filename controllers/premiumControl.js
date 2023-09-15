
const expense = require('../model/expenseModel');
const Expense=require('../model/expenseModel');
const User=require('../model/user');
const sequelize = require('../util/database');


exports.getLeaderboard= async (req, res, next)=>{
    const usersLeaderboard = await User.findAll({
        attributes: ['email','name', 'totalExpense'],
        order: [['totalExpense', 'DESC']],
      });
    
      res.status(200).json({ arr: usersLeaderboard });
      
}

exports.getLeader= async (req, res, next)=>[

]