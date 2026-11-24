import "bootstrap-icons/font/bootstrap-icons.css";
import "../Styles/sidebar.css";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";

function Navbar({ isOpen, setIsOpen }) {

  function handleBtn() {
    setIsOpen(!isOpen);
  }

  const handlePayment = async () => {
  const token = sessionStorage.getItem("token");
  if(!token){
    alert("Please sign in first ");
    return;
  }
  const customerPhone = prompt("Enter you phone number");
  if(!customerPhone){
    return;
  }

  const response = await axios.post("http://localhost:3000/expenses/payments/create-order",{
    customerPhone:customerPhone
  },
  {
headers:{
  Authorization: `Bearer ${token}`
  }
}
)


console.log(response.data);

const cashfree = await load({
    mode: "sandbox"
});

let checkoutOptions = {
    paymentSessionId: response.data.payment_session_id,
    redirectTarget: "_modal"
};
        await cashfree.checkout(checkoutOptions);


  };

  return (
    <>
      <nav className="navbar" style={{ backgroundColor: "#1E293B" }}>
        <div className="container-fluid">

          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn"
              aria-label="Open sidebar"
              onClick={handleBtn}
            >
              <i className="bi bi-list ham fs-3"></i>
            </button>

            <span className="navbar-brand text-white mb-0 h1">
              ExpenseFlow
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">

            <button
              type="button"
              className="btn btn-warning"
              onClick={handlePayment}
            >
              <i className="bi bi-star-fill me-2"></i>
              Buy Premium
            </button>

            <i className="bi bi-person-circle text-white fs-3"></i>

          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;