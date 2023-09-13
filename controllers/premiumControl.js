
const expense = require('../model/expenseModel');
const Expense=require('../model/expenseModel');
const User=require('../model/user');


// exports.getLeaderboard= async (req, res, next) =>{
//     console.log('leader');
//     try {
//         User.findAll()
//           .then((userAll) => {
//             const promises = userAll.map((user) => {
//                 const name=user.name;
//               return Expense.findAll({ where: { email: user.email } })
//                 .then((expenseAll) => {
//                   let total = 0;
//                   let email;
      
//                   expenseAll.forEach((expense) => {
//                     total += expense.amount;
//                     email = expense.name;
//                   });
      
//                   return { email: name, total: total };
//                 });
//             });
      
//             return Promise.all(promises)
//               .then((results) => {
//                 const arr = results.sort((a, b) => b.total - a.total);
//                 console.log(arr);
//                 res.status(200).json({ arr });
//               })
//               .catch((err) => {
//                 throw new Error(err);
//               });
//           })
//           .catch((err) => {
//             throw new Error(err);
//           });
//       } catch (err) {
//         console.log(err);
//       }
      
// }
exports.getLeaderboard= async (req, res, next)=>{
    try {
        const expenseData = await Expense.findAll();

        const leaderboard = {};

        for (const expense of expenseData) {
            const { email, amount } = expense;

            if (!leaderboard[email]) {
                leaderboard[email] = { email, total: 0 };
            }

            leaderboard[email].total += amount;
        }

        // Retrieve user names for each email
        for (const email in leaderboard) {
            try {
                const user = await User.findOne({ where: { email } });
                if (user) {
                    leaderboard[email].email = user.name;
                }
            } catch (err) {
                console.error(err);
            }
        }

        // Convert leaderboard object to an array
        const leaderboardArray = Object.values(leaderboard);

        // Sort the leaderboard by total in descending order
        leaderboardArray.sort((a, b) => b.total - a.total);

        res.status(200).json({ arr: leaderboardArray });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};