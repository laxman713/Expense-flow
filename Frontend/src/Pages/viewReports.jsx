import ExpenseCard from "../components/expenseCard";
import { useState,  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getExpenseService from "../services/expenseGetService";
import deleteExpenseService from "../services/expenseDeleteService";
import expenseDownloadService from "../services/expenseDownlaodService"

function ViewReports() {

    
    const navigate = useNavigate();
    const [downloading, setDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editExpense, setEditExpense] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [highestCategory, setHighestCategory] = useState("None");
    const [highestAmount, setHighestAmount] = useState(0);
    const limit = 2;

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState("all");

    const currentYear = new Date().getFullYear();

    const years = [];

    for (let i = currentYear; i >= currentYear - 4; i--) {
        years.push(i);
    }

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    function handleEdit(expense) {
        setEditExpense(expense);

        navigate("/addExpense", {
            state: { expense: expense }
        });
    }

    async function handleDelete(expenseId) {

        const isConfirmed = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!isConfirmed) {
            return;
        }

        try {
            const result = await deleteExpenseService(expenseId);

            console.log("Delete response:", result);

            setExpenses((prev) =>
                prev.filter((expense) => expense.id !== expenseId)
            );

        } catch (error) {
            console.log("Error deleting expense:", error);
        }
    }

    useEffect(() => {

        let ignore = false;

        const fetchExpenses = async () => {

            setLoading(true);
           

            try {
                const result = await getExpenseService(year, month,page,limit);

                if (!ignore) {
                    setExpenses(result);
                    setExpenses(result.expenses);

                    setTotalPages(result.pagination.totalPages);
                    setTotalRecords(result.pagination.totalExpenses);

                    setTotalExpenses(result.summary.totalAmount);
                    setHighestCategory(result.summary.highestCategory);
                    setHighestAmount(result.summary.highestCategoryAmount);
                }

            } catch (error) {
                console.log("Error fetching expenses:", error);

                if (!ignore) {
                    setExpenses([]);
                    setTotalPages(0);
                    setTotalRecords(0);
                    setTotalExpenses(0);
                    setHighestCategory("None");
                    setHighestAmount(0);
                }

            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchExpenses();

        return () => {
            ignore = true;
        };

    }, [year, month,page]);

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    

    const handleDownload = async () => {

        setDownloading(true);
        setDownloadError("");

        try {

            const blob = await expenseDownloadService(year, month);

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            if (!month || month === "all") {

                link.download = `ExpenseFlow_${year}.csv`;

            } else {

                const formattedMonth = String(month).padStart(2, "0");

                link.download = `ExpenseFlow_${year}_${formattedMonth}.csv`;
            }

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);

        } catch (err) {

            console.log("Download failed:", err);

            if (err.response?.status === 403) {

                setDownloadError("Downloading reports is a premium feature.");

            } else if (err.response?.status === 401) {

                setDownloadError("You are not authorized to download reports.");

            } else {

                setDownloadError("Failed to download expenses. Please try again.");

            }

        } finally {

            setDownloading(false);

        }
    };


    return (
        <>
            <div className="container mt-4">

                <h2 className="mb-4">View Reports</h2>
                <button
                    className="btn text-white mb-2"
                    style={{ backgroundColor: "#0284C7" }}
                    onClick={handleDownload}
                    disabled={downloading}
                >

                    {downloading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Downloading...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-download me-2"></i>
                            Download CSV
                        </>
                    )}

                </button>
              

                <div className="row mb-4">

                    <div className="col-12 col-md-6 mb-3">

                        <label className="form-label">
                            Select Year
                        </label>

                        <select
                            className="form-select"
                            value={year}
                            onChange={(e) => {setYear(e.target.value);setPage(1)}}
                        >
                            {years.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="col-12 col-md-6 mb-3">

                        <label className="form-label">
                            Select Month
                        </label>

                        <select
                            className="form-select"
                            value={month}
                            onChange={(e) => {setMonth(e.target.value),setPage(1)}}
                        >
                            <option value="all">All Months</option>

                            {months.map((item, index) => (
                                <option key={index} value={index + 1}>
                                    {item}
                                </option>
                            ))}
                        </select>

                    </div>

                </div>
                {!loading && (
                    <div className="row mb-4">

                        <div className="col-12 col-md-6 mb-3">
                            <div
                                className="card p-4 h-100"
                                style={{
                                    backgroundColor: "#1E293B",
                                    color: "#FFFFFF"
                                }}
                            >
                                <h5>Total Expenses</h5>

                                <h2 style={{ color: "#38BDF8" }}>
                                    ₹{totalExpenses.toFixed(2)}
                                </h2>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 mb-3">
                            <div
                                className="card p-4 h-100"
                                style={{
                                    backgroundColor: "#273449",
                                    color: "#FFFFFF"
                                }}
                            >
                                <h5>Highest Spending Category</h5>

                                <h3 style={{ color: "#38BDF8" }}>
                                    {highestCategory}
                                </h3>

                                <h5>
                                    ₹{highestAmount.toFixed(2)}
                                </h5>
                            </div>
                        </div>

                    </div>
                )}

                {editExpense && (
                    <div className="alert alert-info">
                        Editing: {editExpense.Title}
                    </div>
                )}

                {loading && (
                    <p className="text-center">
                        Loading expenses...
                    </p>
                )}

                {!loading && expenses.length === 0 && (
                    <div className="alert alert-info text-center">
                        No expenses found for the selected period.
                    </div>
                )}

                {!loading && expenses.map((expense) => (
                    <ExpenseCard
                        key={expense.id}
                        expense={expense}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}

                {!loading && totalPages > 1 && (
                    <nav>
                        <ul className="pagination justify-content-center mt-4">
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                >
                                    Previous
                                </button>
                            </li>
                            {pages.map((item) => (
                                <li
                                    key={item}
                                    className={`page-item ${page === item ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(item)}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                            <li className="page-item">
                                <button
                                    className="page-link"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}

               

            </div>
        </>
    );
}

export default ViewReports;