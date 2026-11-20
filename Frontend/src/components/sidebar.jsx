import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import "../Styles/sidebar.css";
function Sidebar(){
    return(
        <>
        <div className="sidebar">
           <ul className="list-unstyled">
              <li>
                <i className="bi bi-house-door me-2"></i>
                <Link>
                </Link>Home</li>
              <li>
                <i className="bi bi-speedometer2 me-2"></i>
                <Link>
                </Link>Dashboard</li>
              <li>
                <i className="bi bi-arrow-left-right me-2"></i>
                <Link>
                </Link>Transactions</li>
              <li>
                <i className="bi bi-bar-chart-line me-2"></i>
                <Link>
                </Link>Reports</li>
 <li>
                <i className="bi bi-plus-circle me-2"></i>
                <Link>
                </Link>Add Expense</li>           </ul>
        </div>

        </>
    )
}

export default Sidebar;