const leadBoardService = require("../services/leadBoardService");

const leadBoardController = async (req, res) => {
    try {
        const controllerFun = await leadBoardService();

        return res.status(200).json({
            message: "Leaderboard fetched successfully",
            leaderboard: controllerFun
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Unable to fetch leaderboard"
        });
    }
};

module.exports = leadBoardController;