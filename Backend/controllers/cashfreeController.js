const { createOrder, verifyPayment } = require("../services/cashfreeSevice");const {userTable,OrderTable} = require("../createTables/assosiactions");

const createPayment = async (req,res)=>{
    try{
         console.log("Authenticated user:", req.user);
        const customerId = req.user.userId;
        const {customerPhone} = req.body;
        console.log("Customer ID:", customerId);
console.log("Customer Phone:", customerPhone);
      const user = await userTable.findByPk(customerId);

      if(!user){
        return res.status(404).json({
            message:"user not found"
        });
      }

        const orderId = "ORDER"+Date.now();
        const orderAmount = 2000;
        const orderCurrency = "INR";
        const order = await createOrder(orderId,orderAmount,orderCurrency,String(customerId),customerPhone)


        const newOrder = await user.createOrder({
    orderId: orderId,
    orderAmount: orderAmount,
    orderCurrency: orderCurrency,
    orderStatus: "PENDING"
});

        res.status(201).json(order);

    }catch(err){
        console.log(err.response?.data || err.message);
        res.status(500).json({
            message: "Unable to create order"
        });
    }
}
const getPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const customerId = req.user.userId;

        const order = await OrderTable.findOne({
            where: {
                orderId: orderId,
                userId: customerId
            }
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        const payments = await verifyPayment(orderId);

        res.status(200).json(payments);

    } catch (err) {
        console.log(err.response?.data || err.message);

        res.status(500).json({
            message: "Unable to verify payment"
        });
    }
};
module.exports = {
    createPayment,
    getPaymentStatus
};