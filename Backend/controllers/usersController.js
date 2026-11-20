const userServices = require("../services/userServices");

const userPost =async (req,res)=>{
    try{
    const {name,email,password} = req.body;
    const user = await userServices.createUser(name,email,password);
     res.status(201).json({
         message: "User created successfully",
         user
     })
    }catch (err) {
    console.log("Signup error:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
            message: "Email already exists"
        });
    }

    return res.status(500).json({
        message: "Internal server error"
    });
}
}
module.exports = {userPost};