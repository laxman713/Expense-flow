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
       const successfulPayment = payments.find((payment) => {
    return payment.payment_status === "SUCCESS" &&
           payment.is_captured === true &&
           payment.order_id === order.orderId &&
           Number(payment.payment_amount) === Number(order.orderAmount) &&
           payment.payment_currency === order.orderCurrency;
});

console.log(successfulPayment);

console.log("Successful payment found:", !!successfulPayment);
console.log("Current order status:", order.orderStatus);

if (successfulPayment) {
    await OrderTable.sequelize.transaction(async (transaction) => {

        order.orderStatus = "SUCCESSFUL";
        await order.save({ transaction: transaction });

        const user = await userTable.findByPk(customerId, {
            transaction: transaction
        });

        user.isPremium = true;
        await user.save({ transaction: transaction });

    });
}

const user = await userTable.findByPk(customerId);

res.status(200).json({
    orderStatus: order.orderStatus,
    isPremium: user.isPremium
});
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