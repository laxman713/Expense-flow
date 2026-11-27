const crypto = require("crypto");
const forgotPasswordTable = require("../createTables/forgotPassword");
const userTable = require("../createTables/UsersTable");
const bcrypt = require("bcrypt");
const sequelize = require("../model/db-connection");

const validateToken = (resetRecord) => {

    if (!resetRecord) {
        throw new Error("Invalid reset token");
    }

    if (resetRecord.isUsed === true) {
        throw new Error("Token is no longer usable");
    }

    if (new Date() >= resetRecord.expireAt) {
        throw new Error("Token expired");
    }

};


const resetPassword = async (token, password) => {

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const resetRecord = await forgotPasswordTable.findOne({
        where:{
            tokenHash:tokenHash
        }
    })
    
    validateToken(resetRecord)

    const userId = resetRecord.userId;


   const hashedPass =await bcrypt.hash(password,10);

   const transaction = await sequelize.transaction();
   try{
       const user = await userTable.findByPk(userId, {
           transaction: transaction,
           lock: transaction.LOCK.UPDATE
       }); 
       if(!user){
           throw new Error("user not found");
       }
       const lockedResetRecord = await forgotPasswordTable.findOne({
           where: {
               tokenHash: tokenHash
           },
           transaction: transaction,
           lock: transaction.LOCK.UPDATE
       });
       validateToken(lockedResetRecord);

       await user.update({
        password:hashedPass
       },{
        transaction: transaction
       });

       await lockedResetRecord.update({
           isUsed: true
       }, {
           transaction: transaction
       });

       await transaction.commit();
       return true;
   }catch(err){
       await transaction.rollback();
       throw err;
   }


};

module.exports = resetPassword;