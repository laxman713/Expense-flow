const { Op } = require("sequelize");
const expenses = require("../createTables/expenseTable");
const { Parser } = require("@json2csv/plainjs");

// Prevent CSV formula injection
const sanitizeCSV = (value) => {

    if (typeof value === "string") {

        if (/^[\s]*[=+\-@]|^[\t\r\n]/.test(value)) {
            return "'" + value;
        }

    }

    return value;
};


const expenseDownload = async (userId, year, month) => {

    const whereCondition = {
        userId: userId
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

            const formattedMonth = String(month).padStart(2, "0");

            const startDate = `${year}-${formattedMonth}-01`;
            const endDate = `${year}-${formattedMonth}-${lastDay}`;

            whereCondition.date = {
                [Op.between]: [startDate, endDate]
            };
        }
    }

    const downloadQuery = await expenses.findAll({
        where: whereCondition,
        order: [["id", "DESC"]],
        raw: true
    });

    const fields = [
        {
            label: "Expense Title",
            value: (expense) => {
                return sanitizeCSV(expense.Title);
            }
        },
        {
            label: "Category",
            value: (expense) => {
                return sanitizeCSV(expense.category);
            }
        },
        {
            label: "Amount (INR)",
            value: "amount"
        },
        {
            label: "Date",
            value: "date"
        },
        {
            label: "Time",
            value: "time"
        },
        {
            label: "Description",
            value: (expense) => {
                return sanitizeCSV(expense.description);
            }
        }
    ];

    const parser = new Parser({
        fields: fields
    });

    const csv = parser.parse(downloadQuery);

    return csv;
};

module.exports = expenseDownload;