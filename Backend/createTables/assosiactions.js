const sequelize = require("../model/db-connection");
const userTable = require("../createTables/UsersTable");
const ExpenseTable = require("../createTables/expenseTable");
const OrderTable = require("../createTables/orders");
const forgotPassword = require("./forgotPassword");


userTable.hasMany(ExpenseTable);
ExpenseTable.belongsTo(userTable);

userTable.hasMany(OrderTable);
OrderTable.belongsTo(userTable);

userTable.hasMany(forgotPassword);
forgotPassword.belongsTo(userTable);

module.exports = {
    userTable,
    ExpenseTable,
    OrderTable,
    forgotPassword
}