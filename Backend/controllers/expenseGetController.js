const expenseGet = require("../services/expenseGetService");

const expenseGetController = async (req, res) => {
    try {
        const expenseGetControllerResult = await expenseGet(req.user.userId);

        res.status(200).json({
            message: "List of expenses",
            expenseGetControllerResult
        });

    } catch (error) {
        console.log("Error fetching expenses:", error);

        res.status(500).json({
            message: "Failed to retrieve expenses"
        });
    }
};

module.exports = expenseGetController;