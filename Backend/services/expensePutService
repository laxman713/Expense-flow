const expense = require("../createTables/expenseTable");


const expenseServiceFun =async (expenseId,userId,updatedData) =>{
    
    const existingExpense = await expense.findOne({
        where:{
            id: expenseId,
            userId: userId
        }
    });
    if(!existingExpense){
        return null;
    }
   await existingExpense.update({
    Title: updatedData.title,
    amount: updatedData.amount,
    category: updatedData.category,
    date: updatedData.date,
    time: updatedData.time,
    description: updatedData.description
    })
    return existingExpense;
}

module.exports = expenseServiceFun;