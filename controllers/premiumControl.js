
const expense = require('../model/expenseModel');
const Expense=require('../model/expenseModel');
const User=require('../model/user');
const sequelize = require('../util/database');


exports.getLeaderboard= async (req, res, next)=>{
    const usersLeaderboard = await User.findAll({
        attributes: ['email','name',
          [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total'] // Correct format
        ],
        include: [
          {
            model: Expense,
            attributes: []
          }
        ],
        group: ['email'],
        order: [['total', 'DESC']], // Note the double square brackets for order
      });
    
      res.status(200).json({ arr: usersLeaderboard });
      
}

