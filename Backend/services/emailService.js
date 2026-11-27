const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    requireTLS: true,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})





  const sendEmail = async(email,subject,message)=>{
    try{
     const response = await  transport.sendMail({
         from: process.env.SENDER_EMAIL,
         to:email,
         subject: subject,
         text:message
       });
       console.log(response);
      
      }
      catch(err){
        console.log(err);
        throw err;
      }
  }


  module.exports = sendEmail;