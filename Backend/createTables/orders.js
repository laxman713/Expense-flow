const { DataTypes } = require("sequelize");
const sequelize = require("../model/db-connection");

const Orders = sequelize.define("orders",{
     id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    orderAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    orderCurrency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "INR"
    },
    orderStatus: {
        type: DataTypes.ENUM("PENDING", "SUCCESSFUL", "FAILED"),
        allowNull: false,
        defaultValue: "PENDING"
    }
},
{
    timestamps: false
})

module.exports = Orders