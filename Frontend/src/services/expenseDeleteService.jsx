import axios from "axios";

const deleteExpenseService = async(expenseId)=>{
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(`http://localhost:3000/expenses/delete/${expenseId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    
    return response.data;
}

export default deleteExpenseService;