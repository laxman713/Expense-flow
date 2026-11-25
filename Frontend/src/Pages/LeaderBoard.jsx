import { useState, useEffect } from "react";
import axios from "axios";


function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {

        const fetchLeaderboard = async () => {
            try {
                const token = sessionStorage.getItem("token");

                if (!token) {
                    return;
                }

                const response = await axios.get(
                    "/expenses/leaderboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setLeaderboard(response.data.leaderboard);

                console.log(response.data.leaderboard);

            } catch (err) {
                console.log(err);
            }
        };

        fetchLeaderboard();

    }, []);
    return (
        <div className="container mt-4">
            <div className="card shadow-sm">

                <div
                    className="card-header text-white p-3"
                    style={{ backgroundColor: "#1E293B" }}
                >
                    <h4>
                        <i className="bi bi-trophy-fill text-warning me-2"></i>
                        Leaderboard
                    </h4>
                    <p className="mb-0">
                        Users ranked by total expenses
                    </p>
                </div>

                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Total Expense</th>
                            </tr>
                        </thead>

                        <tbody>
                            {leaderboard.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>₹{user.totalExpense || "0.00"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default Leaderboard;