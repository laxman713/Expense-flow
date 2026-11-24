import axios from "axios";

const expenseUpdateService =async (expenseId,updatedData)=>{
      const token = sessionStorage.getItem("token");

    const repsonse =await axios.put(`http://localhost:3000/expenses/update/${expenseId}`,
        updatedData,
        {
            headers:{
                Authorization :`Bearer ${token}`
            }
        }
    );
    return repsonse.data;



}

export default expenseUpdateService; 