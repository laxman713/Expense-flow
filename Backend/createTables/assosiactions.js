const sequelize = require("../model/db-connection");
const userTable = require("../createTables/UsersTable");
const ExpenseTable = require("../createTables/expenseTable");


userTable.hasMany(ExpenseTable);
ExpenseTable.belongsTo(userTable);

module.exports = {
    userTable,
    ExpenseTable
}