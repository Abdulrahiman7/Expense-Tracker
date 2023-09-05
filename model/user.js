const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const user=sequelize.define('user',{
    name:
    {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    email:
    {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password:
    {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports= user;