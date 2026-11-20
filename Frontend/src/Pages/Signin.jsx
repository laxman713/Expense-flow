import { useState } from "react";
import "../Styles/Signin.css"
import expenseImage from "../assets/Expense_trcker.png"
import "bootstrap-icons/font/bootstrap-icons.css";
import signInuser from "../services/signinService";

function Signin() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
 function handleEmail(e){
   setEmail(e.target.value);
 }
 function handlePass(e){
   setPassword(e.target.value);
 }
 async function handleForm(e){
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
        alert("Please fill in all fields");
        return;
    }
  try{
      const result = await signInuser(email,password);
    console.log(result.message);
  }catch(err){

if (err.response?.status === 404) {
            console.log("Email doesn't exist");
        }

        // 3. Password mismatch
        else if (err.response?.status === 401) {
            console.log("Password mismatch");
        }}  
 }



    return (
        <>
            <div className="signup-page">
                <div class="heading">
                    <h1 className="text-center pt-1 heading">Expense Flow</h1>
                    <p className="text-center text-muted heading small"> Track • Manage • Grow </p>
                </div>
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
                                    <div className="card-title fw-bold text-center">Login Your Account</div>
                                    <div className="card-text text-center text-muted"> Start tracking your expenses today </div>
                                    <form onSubmit={handleForm}>
                                        <div className="my-3">


                                            <label className="form-label">Enter Email:  </label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="bi bi-envelope"></i>
                                                </span>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                    onChange={handleEmail}
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
                                                    onChange={handlePass}
                                                />
                                            </div>
                                            <br></br>

                                            <button type="submit" className="btn signup-btn w-100 ">
                                                <i className="bi bi-person-plus me-2" ></i>
                                                Login
                                            </button>

                                            <br></br>
                                            <p className="text-center">----- Create an account?-----</p>

                                            <a href="/signup" className="btn btn-outline-success w-100">
                                                Sign up
                                            </a>
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

export default Signin;