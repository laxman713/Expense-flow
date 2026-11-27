const forgotPassword = require("../services/forgotPassService");

const forgotPasswordController = async(req,res)=>{
    try{

        const {email} = req.body;
        if (typeof email !== "string" || email.trim() === "") {
            return res.status(400).json({
                message: "Email is required"
            });
        }

          await forgotPassword(email.trim());
        return res.status(200).json({
            message: "If an account exists with this email, a password reset link will be sent."
        });


    }catch(err){
        console.error("Password reset request failed");

        return res.status(200).json({
            message: " user is not registered, If an account exists with this email, a password reset link will be sent."
        });

    }
}
module.exports = forgotPasswordController;