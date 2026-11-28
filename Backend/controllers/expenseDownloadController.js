const expenseDownload = require("../services/expenseDownloadService");;

const expenseDownloadController = async (req, res) => {

    try {

        const userId = req.user.userId;

        const { year, month } = req.query;
        if (
            typeof year !== "string" ||
            !/^\d{4}$/.test(year) ||
            Number(year) < 1900 ||
            Number(year) > 9999
        ) {
            return res.status(400).json({
                message: "Invalid year"
            });
        }
        if (
            month !== undefined &&
            month !== "all" &&
            (
                typeof month !== "string" ||
                !/^(0?[1-9]|1[0-2])$/.test(month)
            )
        ) {
            return res.status(400).json({
                message: "Invalid month"
            });
        }

        let filename;

        if (!month || month === "all") {
            filename = `ExpenseFlow_${year}.csv`;
        } else {
            filename = `ExpenseFlow_${year}_${month.padStart(2, "0")}.csv`;
        }
        const csv = await expenseDownload(userId, year, month);
        res.setHeader("Content-Type", "text/csv; charset=utf-8");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filename}"`
        );
        res.status(200).send(csv);
    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Failed to download expenses"
        });
    }
};

module.exports = expenseDownloadController;