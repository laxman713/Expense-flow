import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();

    function handlenewPass(e){
        setNewPassword(e.target.value);
    }
    function handleConfirmPass(e) {

        setConfirmPassword(e.target.value);
    }

   async function handleForm(e){
        e.preventDefault();
        
        if(newPassword!==confirmPassword){
            alert("Password missmatch");
            return;
        }
        try{
            const response =await axios.post("http://localhost:3000/expenses/users/reset-password",{
                token: token,
                password: newPassword
            })
            alert(response.data.message);
            navigate("/signin");

        }catch(err){
            console.log(err.response?.data);
        }
    }
    return (
        <div
            className="min-vh-100 d-flex justify-content-center align-items-center p-3"
            style={{
                backgroundColor: "#F1F5F9",
                color: "#1E293B"
            }}
        >
            <div
                className="card shadow border-0 rounded-4 p-4 p-md-5 w-100"
                style={{ maxWidth: "450px" }}
            >
                <div className="text-center mb-4">

                    <i
                        className="bi bi-shield-lock display-4"
                        style={{ color: "#38BDF8" }}
                    ></i>

                    <h2 className="fw-bold mt-3">
                        Expense<span style={{ color: "#0284C7" }}>Flow</span>
                    </h2>

                    <h4 className="mt-3">Reset Password</h4>

                    <p className="text-secondary">
                        Create a new password for your account.
                    </p>

                </div>

                <form onSubmit={handleForm}>
                    <div className="mb-3">
                        <label className="form-label fw-medium">
                            New Password
                        </label>

                        <input
                            type="password"
                            className="form-control p-3"
                            name="Password"
                            value={newPassword}
                            onChange={handlenewPass}
                            placeholder="Enter new password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            className="form-control p-3"
                            name="ConfirmPass"
                            value={confirmPassword}
                            onChange={handleConfirmPass}
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn text-white w-100 py-3 fw-semibold"
                        style={{ backgroundColor: "#0284C7" }}
                    >
                        Reset Password
                    </button>
                </form>

                <div className="text-center mt-4">
                    <a
                        href="/signin"
                        className="text-decoration-none"
                        style={{ color: "#0284C7" }}
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Sign In
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;