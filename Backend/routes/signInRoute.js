const express = require('express');
const signInController = require('../controllers/signInController');

const router = express.Router();


router.post('/users/signin',signInController.signInUser);
module.exports = router;