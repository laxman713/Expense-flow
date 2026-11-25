const userTable = require("../createTables/UsersTable");
const expenseTable = require("../createTables/expenseTable");
const sequelize = require("../model/db-connection");


const leadBoard = async()=>{
    const getQuery = await userTable.findAll({
       
        include:[
            {
                model:expenseTable,
                attributes:[]
                
            }
        ],
        attributes:["name",
                    [sequelize.fn("SUM",sequelize.col("expenses.amount")),"totalExpense"]
                ],

        group:["users.id","users.name"]    ,
          order:[
            [sequelize.col("totalExpense"),"DESC"]
          ]
        
    })
    return getQuery;
}

module.exports = leadBoard;