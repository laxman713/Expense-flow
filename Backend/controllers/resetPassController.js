const resetPass = require("../services/resetPassService");

console.log("Reset password controller called");
const resetPassController = async (req, res) => {
   const {token,password} = req.body;
    if (typeof token !== "string" || token.trim() === "") {
        return res.status(400).json({
            message: "Invalid reset token"
        });
    }
    if (typeof password !== "string" || password.trim() === "") {
        return res.status(400).json({
            message: "Password is required"
        });
    }
try{
    await resetPass(token,password);
    return res.status(200).json({
        message: "Password reset successfully"
    });
}catch(err){
    console.log(err)
}

};

module.exports = resetPassController;