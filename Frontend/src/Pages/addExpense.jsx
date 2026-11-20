import Navbar from "../components/Navbar";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import "../Styles/addExpense.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AddExpense() {
    const [isOpen, setIsOpen] = useState(false);
    function handleForm(e) {
        e.preventDefault();
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
                                        <label className="form-label">Expense Title :</label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <i className="bi bi-pencil"></i>
                                            </span>
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Enter Title" />
                                        </div>
                                        <label className="form-label">Amount : </label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <i className="bi bi-wallet"></i>
                                            </span>
                                            <input type="number"
                                                className="form-control"
                                                placeholder="Enter amount" />
                                        </div>
                                        <label htmlFor="category" className="form-label">
                                            Category
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-tags"></i>
                                            </span>

                                            <select
                                                id="category"
                                                name="category"
                                                className="form-select"
                                                defaultValue=""
                                                required
                                            >
                                                <option value="" disabled>
                                                    Select Category
                                                </option>
                                                <option value="Food">Food</option>
                                                <option value="Travel">Travel</option>
                                                <option value="Shopping">Shopping</option>
                                                <option value="Bills">Bills</option>
                                                <option value="Health">Health</option>
                                                <option value="Entertainment">Entertainment</option>
                                                <option value="Education">Education</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <label className="form-label">Date :</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-calender-event"></i>
                                            </span>
                                            <input type="date"
                                                className="form-control"
                                                placeholder="Enter Date" />
                                        </div>
                                        <label className="form-label">Time : </label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="bi bi-clock"></i>
                                            </span>
                                            <input type="time"
                                                className="form-control"
                                                placeholder="Enter Time" />
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
                                                placeholder="Enter expense description (optional)"
                                                rows={4}
                                            ></textarea>
                                        </div>
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