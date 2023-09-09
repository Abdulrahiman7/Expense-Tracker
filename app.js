const express=require('express');
const app= express();

const bodyParser=require('body-parser');
const cors=require('cors');
const userroute=require('./routers/userRoute');
const expenseroute=require('./routers/expenseRoute')


app.use(cors());
app.use(bodyParser.json());
app.use(userroute);
app.use(expenseroute);

const User=require('./model/user');
const Expense=require('./model/expenseModel');

Expense.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Expense)

User.sync()
.then(()=>{
    return User.findAll();
})
.then((users)=>{
    // if(users.length>0)
    // {
    return Expense.sync();
    // }
    // return users;
})
.then(()=>{
    app.listen(4000);
})

.catch(err => console.log(err))