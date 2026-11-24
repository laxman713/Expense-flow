const expenses = require('../createTables/expenseTable');

const DelService =async (expenseId,userId)=>{
   const delQuery = await expenses.findOne({
    where:{
        id:expenseId,
        userId:userId
    }

   })
   if (!delQuery) {
    return null;
}
   await delQuery.destroy();
   return true;
}

module.exports = DelService;