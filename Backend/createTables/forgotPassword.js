const { DataTypes } = require("sequelize");
const sequelize = require("../model/db-connection");


const forgotPasswordTable = sequelize.define('forgotpassword', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tokenHash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    expireAt: {
        type: DataTypes.DATE,

        allowNull: false,

    },
    isUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
    }

}, {
    timestamps: false
})

module.exports = forgotPasswordTable;