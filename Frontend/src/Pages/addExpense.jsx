
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import "../Styles/addExpense.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import addExpense from "../services/addExpenseService";
import { useLocation } from "react-router-dom";
import expenseUpdateService from "../services/updateExpenseService";






const handlePayment = async () => {
    console.log("Buy Premium clicked");
};



// Get current local date and time
function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}`
    };
}






function getInitialExpense() {
    return {
        title: "",
        amount: "",
        ...getCurrentDateTime(),
        description: ""
    };
}




function AddExpense() {
    const [isOpen, setIsOpen] = useState(false);

    const [expense, setExpense] = useState(getInitialExpense);
      
    const location = useLocation();
    const editExpense = location.state?.expense;
    console.log("Expense recieved for editing:", editExpense)


    function handleChange(e) {
        const { name, value } = e.target;

        console.log("Changed field:", name, "Value:", value);

        setExpense((prev) => ({
            ...prev,
            [name]: value
        }));
    }




  useEffect(() => {
    if (editExpense) {
        setExpense({
            title: editExpense.Title,
            amount: editExpense.amount,
            date: editExpense.date?.slice(0, 10),
            time: editExpense.time?.slice(0, 5),
            description: editExpense.description
        });
    }
}, [editExpense]);






    async function handleForm(e) {
        e.preventDefault();

        console.log(expense);

        const token = sessionStorage.getItem("token");

        if (!token) {
            alert("Please sign in first");
            return;
        }

        try {
            if(editExpense){
                console.log("Updating expense ID:", editExpense.id);
    console.log("Updated data:", expense);
       const result = await expenseUpdateService(editExpense.id,expense);
       console.log("Update API response:", result);
       alert("Expense updated successfully");
            }else{
                const result = await addExpense(expense, token);
           
            console.log(result.message);
            alert("Expense added successfully");

            // Reset form and refresh date/time
            setExpense(getInitialExpense());
            }

        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    }





    return (
        <div>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="d-flex">
                {isOpen && <Sidebar />}

                <main className="flex-grow-1 main-content">
                    <h1>Add Expense</h1>

                    <div className="row">
                        <div className="col">
                            <div className="card shadow-sm">
                                <div className="card-body">

                                    <form onSubmit={handleForm}>

                                        <label className="form-label">
                                            Expense Title :
                                        </label>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <i className="bi bi-pencil"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Title"
                                                name="title"
                                                value={expense.title}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <label className="form-label">
                                            Amount :
                                        </label>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <i className="bi bi-wallet"></i>
                                            </span>

                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter amount"
                                                name="amount"
                                                value={expense.amount}
                                                onChange={handleChange}
                                                min="0.01"
                                                step="0.01"
                                                required
                                            />
                                        </div>                                                
                                              

                                        <label className="form-label">
                                            Date :
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-calendar-event"></i>
                                            </span>

                                            <input
                                                type="date"
                                                className="form-control"
                                                name="date"
                                                value={expense.date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <label className="form-label">
                                            Time :
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-clock"></i>
                                            </span>

                                            <input
                                                type="time"
                                                className="form-control"
                                                name="time"
                                                value={expense.time}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <label htmlFor="description" className="form-label">
                                            Description
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-card-text"></i>
                                            </span>

                                            <textarea
                                                id="description"
                                                name="description"
                                                className="form-control"
                                                placeholder="Enter expense description"
                                                rows={4}
                                                value={expense.description}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn text-white w-100"
                                            style={{ backgroundColor: "#0284C7" }}
                                        >
                                            <i className="bi bi-plus-circle me-2"></i>
                                            {editExpense ? "Update Expense" : "Add Expense"}
                                        </button>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AddExpense;
