const expenseGet = require("../services/expenseGetService");

const expenseGetController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const year = req.query.year;
        const month = req.query.month;
        const page = Number(req.query.page||1);
        const limit = Number(req.query.limit|| 10);
        const expenseGetControllerResult = await expenseGet(userId,year,month,page,limit);

        res.status(200).json({
            message: "List of expenses",
            expenseGetControllerResult
        });
        if (!Number.isSafeInteger(page) || page < 1) {
            return res.status(400).json({
                message: "Invalid page number"
            });
        }

        if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) {
            return res.status(400).json({
                message: "Invalid limit"
            });
        }
        if (year) {
    if (!/^\d{4}$/.test(year) || Number(year) < 1000) {
        return res.status(400).json({
            message: "Invalid year"
        });
    }
}

    } catch (error) {
        console.log("Error fetching expenses:", error);

        res.status(500).json({
            message: "Failed to retrieve expenses"
        });
    }
};

module.exports = expenseGetController;