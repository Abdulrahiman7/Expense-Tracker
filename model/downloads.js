const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const downloads=sequelize.define('downloads',{
    id:
    {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true
    },
    URL:
    {
        type: Sequelize.STRING,
        allowNUll: false
    }
});

module.exports = downloads;