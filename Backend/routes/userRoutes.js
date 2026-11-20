const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();


router.post('/users/signup',userController.userPost);
module.exports = router;