const expenses = require("../createTables/expenseTable");
const { Op,fn,col } = require("sequelize");

const expenseGet =async (userId,year,month,page,limit)=>{
    const offset = (page-1)*limit;
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
    const getQuery =await expenses.findAndCountAll({
        where:whereCondition,
        limit: limit,
        offset:offset,
        order: [["id","DESC"]]
    })

    const totalAmount = await expenses.sum("amount",{
        where:whereCondition
    });

    const highestCategory = await expenses.findAll({
        attributes:[
            "category",
            [fn("SUM",col("amount")),"totalAmount"]
        ],
        where:whereCondition,
        group: ["category"],
        order:[
            [fn("SUM",col("amount")),"DESC"],
            ["category","ASC"]
        ],
        limit:1,
        raw: true
    });
    let categoryName = "None";
    let categoryAmount = 0;

    if (highestCategory.length > 0) {
        categoryName = highestCategory[0].category;
        categoryAmount = Number(highestCategory[0].totalAmount);
    }
    console.log(highestCategory);
    const totalPages = Math.ceil(getQuery.count/limit);
    return {
        expenses: getQuery.rows,
        pagination: {
            currentPage: page,
            limit: limit,
            totalExpenses: getQuery.count,
            totalPages: totalPages
        },
        summary: {
            totalAmount: Number(totalAmount || 0),
            highestCategory: categoryName,
            highestCategoryAmount: categoryAmount
        }

    };
}
module.exports = expenseGet

