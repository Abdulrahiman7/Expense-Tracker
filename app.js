const express=require('express');
const fs=require('fs');
const path=require('path');

const app= express();
require('dotenv').config();
const bodyParser=require('body-parser');
const cors=require('cors');
const userroute=require('./routers/userRoute');
const expenseroute=require('./routers/expenseRoute')
const orderroute=require('./routers/orderRoute');
const sequelize=require('./util/database')
const helmet=require('helmet');
const morgan=require('morgan');
//const LogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});

app.use(cors());
app.use(bodyParser.json());
// app.use(helmet());
// app.use(morgan('combined',{stream:LogStream}));

app.use(userroute);
app.use(expenseroute);
app.use(orderroute);
app.use((req,res)=>{
    console.log(req.url);
    res.sendFile(path.join(__dirname, `views/${req.url}`))
});

const User=require('./model/user');
const Expense=require('./model/expenseModel');
const Order=require('./model/order');
const Uuid=require('./model/forgotPassword');
const downloads=require('./model/downloads');

Expense.belongsTo(User, {constraints: true, onDelete: 'CASCADE', foreignKey: 'email'});
User.hasMany(Expense,{foreignKey: 'email'});
User.hasMany(Order,{foreignKey: 'email'});
Order.belongsTo(User,{foreignKey: 'email'});
Uuid.belongsTo(User, {foreignKey: 'email'});
User.hasOne(Uuid, {foreignKey: 'email'});
downloads.belongsTo(User, {foreignKey: 'email'});
User.hasMany(downloads, {foreignKey: 'email'});


sequelize.sync()
.then(()=>{
    console.log('started listening port');
    app.listen(4000);
})

.catch(err => console.log(err))
