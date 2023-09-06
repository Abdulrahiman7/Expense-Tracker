const Expensecontrol=require('../controllers/expenseControl');
const express=require('express');
const router=express.Router();

const cors=require('cors');
router.use(cors());

router.post('/expense',Expensecontrol.postExpense);

router.get('/expense',Expensecontrol.getExpense);

module.exports= router;