const Sequelize=require('sequelize');
const sequelize=new Sequelize('expense-tracker','root',null,{
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
    dialectOptions:{
        password: 'Rockrolland@981'
    }
});

module.exports=sequelize;