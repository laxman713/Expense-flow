const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const premiumMiddleware = require("../middleware/premiumMiddleware");
const leadBoardController = require("../controllers/leadBoardController");
const expenseDownloadController = require("../controllers/expenseDownloadController");

router.get(
    "/leaderboard",
    authMiddleware,
    premiumMiddleware,
    leadBoardController
);

router.get(
    "/download",
    authMiddleware,
    premiumMiddleware,
    expenseDownloadController
);

module.exports = router;