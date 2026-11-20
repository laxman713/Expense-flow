const Users = require("../createTables/UsersTable");
const bcrypt = require("bcrypt");


const signInUser =async (email,password)=>{
   const user =await  Users.findOne({
    where:{
        email:email
    }
   }) 
   if(!user){
     const error = new Error("User not exist");
     error.statusCode = 404;
     throw error;
   }    
   const isMatch = await bcrypt.compare(password, user.password)
   if(!isMatch){
     const error = new Error("User not authorized");
     error.statusCode = 401;
     throw error;
   }
   return user;
}

module.exports = {signInUser};