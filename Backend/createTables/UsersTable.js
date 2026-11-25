const { DataTypes } = require("sequelize");
const sequelize = require("../model/db-connection");


const Users = sequelize.define('users',{
     id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
     },
     name:{
        type: DataTypes.STRING,
        allowNull:false,
     },
     email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
     },
     password: {
    type: DataTypes.STRING,
    allowNull: false
},isPremium: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
}
},{
    timestamps:false
})

module.exports = Users;