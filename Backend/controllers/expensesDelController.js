const delService = require("../services/expensDelService");

const delController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const delQuery = await delService(id, userId);

        if (!delQuery) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            message: "Deleted successfully"
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Failed to delete expense"
        });
    }
};

module.exports = delController;