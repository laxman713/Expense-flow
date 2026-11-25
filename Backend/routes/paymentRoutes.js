const express = require("express");
const router = express.Router();

const {
    createPayment,
    getPaymentStatus
} = require("../controllers/cashfreeController");
const premiumStatusController = require("../controllers/cashfreePaymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create-order",authMiddleware, createPayment);
router.get("/verify/:orderId", authMiddleware, getPaymentStatus);
router.get("/users/premium-status", authMiddleware, premiumStatusController);
module.exports = router;