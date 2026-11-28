import axios from "axios";


const expenseDownloadService = async (year, month) => {

    const token = sessionStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:3000/expenses/download",
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                year: year,
                month: month
            },
            responseType: "blob"
        }
    );

    return response.data;
};

export default expenseDownloadService;