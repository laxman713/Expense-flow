const expenses = require("../createTables/expenseTable");
const { Op } = require("sequelize");

const expenseGet =async (userId,year,month)=>{
    const whereCondition = {
        userId:userId
    };
    if (year) {

        if (!month || month === "all") {

            const startDate = `${year}-01-01`;
            const endDate = `${year}-12-31`;

            whereCondition.date = {
                [Op.between]: [startDate, endDate]
            };

        } else {

            const lastDay = new Date(
                Number(year), Number(month), 0
            ).getDate();

            const formattedMonth = month.padStart(2, "0");

            const startDate = `${year}-${formattedMonth}-01`;
            const endDate = `${year}-${formattedMonth}-${lastDay}`;

            whereCondition.date = {
                [Op.between]: [startDate, endDate]
            };
        }
    }
    const getQuery =await expenses.findAll({
        where:whereCondition
        
    })
    return getQuery;
}

module.exports = expenseGet