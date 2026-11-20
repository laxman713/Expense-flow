import axios from "axios";
const postUsers =async (name,email,password)=>{

    try{
    const response =await axios.post("/expenses/users/signup",{
        name:name,
        email:email,
        password:password
    });
    return  response.data;
}
catch(err){
    console.log(err);
    throw err;
}
}

export default postUsers;
