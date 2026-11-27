import axios from "axios";

const getExpenseService = async (year, month) => {

    const token = sessionStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:3000/expenses/get",
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                year: year,
                month: month
            }
        }
    );

    return response.data.expenseGetControllerResult;
};

export default getExpenseService;