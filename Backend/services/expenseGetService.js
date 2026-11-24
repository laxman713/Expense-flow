const expenses = require("../createTables/expenseTable");


const expenseGet =async (userId)=>{
    const getQuery =await expenses.findAll({
        where:{
            userId:userId
        }
    })
    return getQuery;
}

module.exports = expenseGet