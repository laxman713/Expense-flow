const signInService = require("../services/signinService");
const jwt = require("jsonwebtoken");
const signInUser = async (req,res)=>{
    try{
        const {email,password} = req.body;
    const user =await signInService.signInUser(email,password);
    const token = jwt.sign(
    {userId: user.id},
     process.env.JWT_SECRET,
    {expiresIn:"24h"});
    res.status(200).json({
        message: "User login Successfully",
        token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email
    }
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