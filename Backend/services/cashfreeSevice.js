const { Cashfree, CFEnvironment } = require("cashfree-pg");

const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
);


const createOrder = async(
    orderId,
    orderAmount,
    orderCurrency="INR",
    customerId,
    customerPhone

)=>{
   try{
          const expiryTime = new Date(Date.now()+60*60*1000)
          const formattedDate = expiryTime.toISOString();
var request = {
    "order_amount": orderAmount,
    "order_currency": orderCurrency,
    "order_id": orderId,
    "customer_details": {
        "customer_id": customerId,
        "customer_phone": customerPhone
    },
    "order_meta": {
        "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}",
        
    },
    "order_expiry_time": formattedDate
};

const response = await cashfree.PGCreateOrder(request);
return response.data;
   }catch(err){
    console.log(err.response?.data || err.message);
    throw err;
   }
}
const verifyPayment = async (orderId) => {
    try {
        const response = await cashfree.PGOrderFetchPayments(orderId);

        return response.data;

    } catch (err) {
        console.log(err.response?.data || err.message);
        throw err;
    }
};

module.exports = {
    createOrder,
    verifyPayment
};