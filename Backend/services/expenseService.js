const expenseTable = require("../createTables/expenseTable");

const insertExpense = async (title,amount,category,date,time,description,userId)=>{
    const entryExpense = await expenseTable.create({
        Title:title,
        amount:amount,
        category:category,
        date:date,
        time:time,
        description:description,
        userId:userId
    })
    return entryExpense;
} 

module.exports = {
    insertExpense
}