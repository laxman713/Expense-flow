import axios from "axios";

const getExpenseService = async()=>{
    const token = sessionStorage.getItem("token");
   const response = await axios.get("http://localhost:3000/expenses/get",{
    headers:{
        Authorization: `Bearer ${token}`
    }
   }) 
   return response.data.expenseGetControllerResult;
}

export default getExpenseService;