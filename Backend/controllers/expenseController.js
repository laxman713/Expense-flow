const expenseServices = require("../services/expenseService")

const expenseControllerfun = async (req,res)=>{
    const {title,amount,category,date,time,description} = req.body;
   const userId = req.user.userId;
   console.log("Request body:", req.body);
console.log("Title from controller:", title);
    try{
    const insertQuery =await expenseServices.insertExpense(title,amount,category,date,time,description,userId);
    if(!insertQuery){
       return res.status(404).json({
            message:"insertion failed",
        })
    }
     res.status(201).json({
            message:"Expense inserted",
            insertQuery
        })
}catch(err){
    console.log(err);
    return res.status(500).json({
        message: "Internal Server Error"
    });
}

}

module.exports = {
    expenseControllerfun
}