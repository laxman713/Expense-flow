const expenseUpdateService = require("../services/expensePutService");

const expensePutController = async (req, res) => {
    try {
        const updatedData = req.body;
        const { id } = req.params;
        const userId = req.user.userId;

        const result = await expenseUpdateService(id, userId, updatedData);

        if (!result) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            message: "Expense updated successfully",
            result
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Failed to update expense"
        });
    }
};

module.exports = expensePutController;