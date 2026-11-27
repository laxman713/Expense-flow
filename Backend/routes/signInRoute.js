const express = require('express');
const signInController = require('../controllers/signInController');
const forgotPasswordController = require("../controllers/forgotPassController");
const resetPassController = require("../controllers/resetPassController");

const router = express.Router();


router.post('/users/signin',signInController.signInUser);
router.post("/users/forgot-password", forgotPasswordController);
router.post("/users/reset-password", resetPassController);
module.exports = router;