const crypto = require("crypto");
const  userTable  = require("../createTables/UsersTable");
const forgotPasswordTable = require("../createTables/forgotPassword");
const sequelize = require("../model/db-connection");
// const emailService = require("./emailService");
const sendEmail = require("./emailService");


const findUser = async (email, transaction) => {
    const user = await userTable.findOne({
        where: {
            email: email
        },
        transaction: transaction,
        lock: transaction.LOCK.UPDATE
    });
    if (!user) {
        return null;
    }
    return user;
}



const forgotPassword = async (email) => {
    let user;
    let resetLink;
    const transaction = await sequelize.transaction();





    try {
         user = await findUser(email, transaction)
         console.log("user found",Boolean(user))
        if (!user) {
            await transaction.rollback();
            return null;
        }
        await forgotPasswordTable.update({
            isUsed: true
        }, {
            where: {
                userId: user.id,
                isUsed: false
            },
            transaction: transaction
        })






        const token = crypto.randomUUID();
         resetLink = `http://localhost:3000/reset-password/${token}`;
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
        const expireAt = new Date(Date.now() + 15 * 60 * 1000);





        const resetRecord = await user.createForgotpassword({
            tokenHash: tokenHash,
            expireAt: expireAt
        },
            {
                transaction: transaction
            })






        await transaction.commit();
       

    }

    catch (err) {
        console.log(err);
        await transaction.rollback();
        throw err;
    }
    try {
        const subject = "ExpenseFlow - Password Reset Request";

        const message = `Click the following link to reset your password:

${resetLink}

This link will expire in 15 minutes.

If you did not request a password reset, ignore this email.`;


        await sendEmail(user.email, subject, message);
        return true;

    } catch (err) {
        console.log("Failed to send reset email");
        throw err;
    }
    
}

module.exports = forgotPassword;


