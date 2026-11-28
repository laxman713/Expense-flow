import axios from "axios";

const getExpenseService = async (year, month,page,limit) => {

    const token = sessionStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:3000/expenses/get",
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                year: year,
                month: month,
                page:page,
                limit:limit
            }
        }
    );

    return response.data.expenseGetControllerResult;
};

export default getExpenseService;