const Expensecontrol=require('../controllers/expenseControl');
const express=require('express');
const router=express.Router();

const cors=require('cors');
router.use(cors());

const Authorization=require('../middleware/token')

router.post('/expense',Authorization.authorize,Expensecontrol.postExpense);

router.get('/expense',Authorization.authorize,Expensecontrol.getExpense);

router.delete('/expense/:id',Authorization.authorize,Expensecontrol.deleteExpense);
module.exports= router;