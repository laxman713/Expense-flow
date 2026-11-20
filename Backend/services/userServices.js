const Users = require("../createTables/UsersTable");


const bcrypt = require("bcrypt"); 

const createUser =async (name,email,password)=>{
    const hashedPass = await bcrypt.hash(password,10);
    const user = await Users.create({
        name:name,
        email:email,
        password:hashedPass
    });
    return user;
}

module.exports = {createUser};