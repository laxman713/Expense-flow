import "../Styles/Signup.css"
import expenseImage from "../assets/Expense_trcker.png"
import "bootstrap-icons/font/bootstrap-icons.css";

function Signup() {


    return (
        <>
            <div className="signup-page">
                <h1 className="text-center pt-1 heading">Expense Flow</h1>
                <p className="text-center text-muted small"> Track • Manage • Grow </p>
                <div className="container-fluid  ">
                    <div className="row d-flex align-items-center justify-content-center ">
                        <div className="col-12 col-md-6 col-xl-6 col-xxl-6 d-flex justify-content-center">
                            <div className="card border-0 bg-transparent">
                                <img
                                    src={expenseImage}
                                    alt="Expences Tracker"
                                    className="card-image-top img-fluid signup-image rounded" />
                                <div className="card-body">
                                    <div className="card-title fw-bold">
                                        Take control of your expenses
                                    </div>
                                    <p className="card-text">
                                        Track your spending, set budgets<br></br> and achieve
                                        your financial goals.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-xl-6 col-xxl-6 d-flex justify-content-center jsutify-content-md-start">
                            <div className="card col-md-10 me-md-5">
                                <div className="card-body">
                                    <div className="card-title fw-bold text-center">Create Your Account</div>
                                    <div className="card-text text-center text-muted"> Start tracking your expenses today </div>
                                    <form>
                                        <div className="my-3">
                                            <label className="form-label">Enter Full Name:  </label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-person"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <br></br>
                                            <label className="form-label">Enter Email:  </label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-envelope"></i>
                                                </span>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            <br></br>
                                            <label className="form-label">Enter Password:  </label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-eye"></i>
                                                </span>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Enter your password"
                                                />
                                            </div>
                                            <br></br>
                                            <label className="form-label">Confirm your password:  </label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-eye-slash"></i>
                                                </span>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Re enter your password"
                                                />
                                            </div>
                                            <br></br>
                                            <button type="submit" className="btn signup-btn w-100 ">
                                                <i className="bi bi-person-plus me-2" ></i>
                                                Create Account
                                            </button>                                        
                                            
                                        <br></br>
                                        <p className="text-center">----- Already have an account?-----</p>
                                        
                                        <button type="submit" className="btn btn-outline-success w-100">Login</button>
                                        
                                            </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Signup;