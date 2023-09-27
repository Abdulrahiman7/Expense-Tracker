
const Order=require('../model/order');
const Razorpay=require('razorpay');
const keyId=process.env.RAZORPAY_key_id;
const keySecret=process.env.RAZORPAY_key_secret;

exports.buyPremium= async (req,res,next)=> {
    console.log('entered the buy Premium')
    try{
    const rzp=new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    })
    const amt=2400;
    rzp.orders.create({amount:amt,currency:'INR'}, (err, order)=>{
        if(err)
        {
            console.log(err);
        }
        req.user.createOrder({orderId:order.id, status:'PENDING'})
        .then(()=>{
            return res.status(201).json({order_id: order.id, key_id:rzp.key_id})
        })
        .catch((err)=>{
            console.log(err);    
          });
    })
}catch(err){
    console.log(err);
    
}
}

exports.orderStatus= async (req,res, next)=>{
    try{
        console.log('entered the status')
        if(req.body.status === 'SUCCESS')
        {
            const {payment_id, order_id}=req.body;

        const x=await Order.findOne({where:{orderId:order_id}})
        .then((order)=>{
            
            return order.update({paymentId: payment_id,  status:'SUCCESS'})
        })
        .then(()=>{
            return req.user.update({premiumUser: true})
        })
        .then(()=>{
            console.log('payment successful')
            return res.status(200).json({success: true});
        })
        .catch(()=>{
            Order.update({status: 'FAILED'},{where:{orderId: order_id}})
        })
        }else{
            await Order.update({status: 'FAILED'},{where:{
                orderId: req.body.order_id
            }})
        }  
    }
catch(err){
    console.log(err);

}
}