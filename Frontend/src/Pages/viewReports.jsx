import ExpenseCard from "../components/expenseCard";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getExpenseService from "../services/expenseGetService";
import deleteExpenseService from "../services/expenseDeleteService";

function ViewReports() {

    const observerRef = useRef(null);
    const navigate = useNavigate();

    const [visible, setVisible] = useState(2);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editExpense, setEditExpense] = useState(null);

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
            setVisible(2);

            try {
                const result = await getExpenseService(year, month);

                if (!ignore) {
                    setExpenses(result);
                }

            } catch (error) {
                console.log("Error fetching expenses:", error);

                if (!ignore) {
                    setExpenses([]);
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

    }, [year, month]);


    useEffect(() => {

        if (!observerRef.current || loading) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {

            const entry = entries[0];

            if (entry.isIntersecting) {
                setVisible((prev) => prev + 10);
            }

        });

        observer.observe(observerRef.current);

        return () => observer.disconnect();

    }, [visible, loading, expenses.length]);


    let totalExpenses = 0;

    for (let i = 0; i < expenses.length; i++) {
        totalExpenses = totalExpenses + Number(expenses[i].amount);
    }


    return (
        <>
            <div className="container mt-4">

                <h2 className="mb-4">View Reports</h2>

                <div className="row mb-4">

                    <div className="col-12 col-md-6 mb-3">

                        <label className="form-label">
                            Select Year
                        </label>

                        <select
                            className="form-select"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
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
                            onChange={(e) => setMonth(e.target.value)}
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
                    <div
                        className="card mb-4 p-4"
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

                {!loading && expenses.slice(0, visible).map((expense) => (
                    <ExpenseCard
                        key={expense.id}
                        expense={expense}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}

                {!loading && visible < expenses.length && (
                    <div ref={observerRef}></div>
                )}

            </div>
        </>
    );
}

export default ViewReports;