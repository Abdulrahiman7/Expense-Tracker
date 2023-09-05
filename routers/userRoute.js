const Usercontrol=require('../controllers/userControl');
const express=require('express');
const router=express.Router();

const cors=require('cors');
router.use(cors());

router.post('/signup',Usercontrol.createUser);

module.exports= router;