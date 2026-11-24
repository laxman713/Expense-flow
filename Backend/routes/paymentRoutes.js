const express = require("express");
const router = express.Router();

const {
    createPayment,
    getPaymentStatus
} = require("../controllers/cashfreeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create-order",authMiddleware, createPayment);
router.get("/verify/:orderId", authMiddleware, getPaymentStatus);
module.exports = router;