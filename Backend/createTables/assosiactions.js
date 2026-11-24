const sequelize = require("../model/db-connection");
const userTable = require("../createTables/UsersTable");
const ExpenseTable = require("../createTables/expenseTable");
const OrderTable = require("../createTables/orders")


userTable.hasMany(ExpenseTable);
ExpenseTable.belongsTo(userTable);

userTable.hasMany(OrderTable);
OrderTable.belongsTo(userTable);

module.exports = {
    userTable,
    ExpenseTable,
    OrderTable
}