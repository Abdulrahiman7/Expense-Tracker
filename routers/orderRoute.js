const express=require('express');

const router=express.Router();
const orderControl=require('../controllers/orderControl')
const cors=require('cors');
router.use(cors());

const Authorization=require('../middleware/token');

router.get('/order/buypremium',Authorization.authorize,orderControl.buyPremium);

router.post('/order/buystatus',Authorization.authorize,orderControl.orderStatus);


module.exports=router;