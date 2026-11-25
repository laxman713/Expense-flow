const getPremiumStatus = require("../services/cashfreePaymentService");


const paymentStatusController = async (req,res) =>{
    const userId = req.user.userId
    try{
    const isPremium = await getPremiumStatus(userId);
  
    res.status(200).json({
        messaage:"User found",
        isPremium:isPremium
    })
}catch(err){
    console.log(err);
    res.status(500).json({
            message: "Unable to fetch premium status"
        });
}
}
module.exports = paymentStatusController;