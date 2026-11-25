const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const premiumMiddleware = require("../middleware/premiumMiddleware");
const leadBoardController = require("../controllers/leadBoardController");

router.get(
    "/leaderboard",
    authMiddleware,
    premiumMiddleware,
    leadBoardController
);

module.exports = router;