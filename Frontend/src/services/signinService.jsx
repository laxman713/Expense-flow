import axios from "axios";


const signInuser =async (email,password)=>{
    try{
    const result  = await axios.post("/expenses/users/signin",{
        email:email,
        password:password
    })
    return result.data;
}
catch(err){
    console.log(err);
    throw err;
}
}

export default signInuser; 