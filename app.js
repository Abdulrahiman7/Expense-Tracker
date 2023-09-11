const express=require('express');
const app= express();
require('dotenv').config();
const bodyParser=require('body-parser');
const cors=require('cors');
const userroute=require('./routers/userRoute');
const expenseroute=require('./routers/expenseRoute')
const orderroute=require('./routers/orderRoute');
const sequelize=require('./util/database')
app.use(cors());
app.use(bodyParser.json());

app.use(userroute);
app.use(expenseroute);
app.use(orderroute);


const User=require('./model/user');
const Expense=require('./model/expenseModel');
const Order=require('./model/order');

Expense.belongsTo(User, {constraints: true, onDelete: 'CASCADE', foreignKey: 'email'});
User.hasMany(Expense,{foreignKey: 'email'});
User.hasMany(Order,{foreignKey: 'email'});
Order.belongsTo(User,{foreignKey: 'email'});

sequelize.sync()
.then(()=>{
    app.listen(4000);
})

.catch(err => console.log(err))