const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const forgotPasswordRequests=sequelize.define('forgotPasswordRequests',{
    id:
    {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    uuid:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    active:
    {
        type: Sequelize.BOOLEAN,
      
    }
});

module.exports=forgotPasswordRequests;