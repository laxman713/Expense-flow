const createOrder = require("../services/cashfreeSevice");

const createPayment = async (req,res)=>{
    try{
        const {customerId,customerPhone} = req.body;
        const orderId = "ORDER"+Date.now();
        const orderAmount = 2000;
        const orderCurrency = "INR";
        const order = await createOrder(orderId,orderAmount,orderCurrency,String(customerId),customerPhone)

        res.status(201).json(order);

    }catch(err){
        console.log(err.response?.data || err.message);
        res.status(500).json({
            message: "Unable to create order"
        });
    }
}
module.exports = createPayment; 