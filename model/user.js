const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const user=sequelize.define('user',{
    name:
    {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    email:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    password:
    {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports= user;