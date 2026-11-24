
const express = require("express");
const router = express.Router();

const  expenseController  = require("../controllers/expenseController");
const expenseGetController = require("../controllers/expenseGetController");
const expensePutController = require("../controllers/expenseUpdateController");
const delController = require("../controllers/expensesDelController")
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, expenseController.expenseControllerfun);
router.get("/get", authMiddleware, expenseGetController);
router.put("/update/:id",authMiddleware,expensePutController);
router.delete('/delete/:id',authMiddleware,delController)

module.exports = router;