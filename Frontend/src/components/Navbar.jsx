import "bootstrap-icons/font/bootstrap-icons.css";
import "../Styles/sidebar.css"


function Navbar({isOpen,setIsOpen}) {
     function handleBtn(){
        setIsOpen(!isOpen);
     }
    return (
        <>
    <nav className="navbar " style={{backgroundColor: "#1E293B"}}>
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

          <span className="navbar-brand mb-0 h1">
            ExpenseFlow
          </span>
        </div>

        <i className="bi bi-person-circle fs-3"></i>

      </div>
    </nav>
    </>
  );
}

export default Navbar;