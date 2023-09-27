const Expensecontrol=require('../controllers/expenseControl');
const Premiumcontrol=require('../controllers/premiumControl');
const express=require('express');
const router=express.Router();

const cors=require('cors');
router.use(cors());

const Authorization=require('../middleware/token');


router.post('/expense',Authorization.authorize,Expensecontrol.postExpense);

router.get('/expense',Authorization.authorize,Expensecontrol.getExpense);

router.delete('/expense/:id',Authorization.authorize,Expensecontrol.deleteExpense);

router.get('/premium/leaderboard',Authorization.authorize,Premiumcontrol.getLeaderboard);

router.get('/premium/expenseReport',Authorization.authorize,Premiumcontrol.getReport);

router.get('/premium/download',Authorization.authorize, Premiumcontrol.downloadExpense);
module.exports= router;