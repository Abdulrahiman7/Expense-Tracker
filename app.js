const express=require('express');
const app= express();

const bodyParser=require('body-parser');
const cors=require('cors');
const route=require('./routers/userRoute');
const sequelize=require('./model/user');

app.use(cors());
app.use(bodyParser.json());
app.use(route);

sequelize.sync({})
.then(()=>{
    app.listen(4000);
})
.catch(err => console.log(err))