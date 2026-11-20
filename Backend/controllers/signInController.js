const signInService = require("../services/signinService");

const signInUser = async (req,res)=>{
    try{
        const {email,password} = req.body;
    const user =await signInService.signInUser(email,password);
    res.status(200).json({
        message: "User login Successfully",
        user
    });
    }
    catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({
            message : err.statusCode ? err.message: "Internal server error"
        });
    }


}


module.exports = {
    signInUser
}