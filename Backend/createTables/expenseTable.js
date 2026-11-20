const { DataTypes } = require("sequelize");
const sequelize = require("../model/db-connection");


const Expenses = sequelize.define('expenses',{
     id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
     },
     Title:{
        type: DataTypes.STRING,
        allowNull:false,
     },
     amount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
        
     },
     category: {
    type: DataTypes.STRING,
    allowNull: false
},
date:{
     type:DataTypes.DATEONLY,
     allowNull:false
},
time:{
    type:DataTypes.TIME,
    allowNull:false
},
description:{
    type:DataTypes.TEXT,
   
}


},{
    timestamps:false
})

module.exports = Expenses;