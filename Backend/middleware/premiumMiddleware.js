const premiumService = require("../services/cashfreePaymentService");

const premiumMiddleware = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const isPremium = await premiumService(userId);

        if (!isPremium) {
            return res.status(403).json({
                message: "Premium membership required"
            });
        }

        next();

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Unable to verify premium status"
        });
    }
};

module.exports = premiumMiddleware;