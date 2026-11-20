import axios from "axios";

const addExpense = async (expense, token) => {
    const response = await axios.post(
        "/expenses/add",
        expense,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export default addExpense;