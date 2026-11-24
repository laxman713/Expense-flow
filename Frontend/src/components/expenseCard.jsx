function ExpenseCard({expense,onEdit,onDelete}) {
    function handleEdit(){
        onEdit(expense)
        console.log(expense.id);
    }
    function handleDelete(){
        onDelete(expense.id);
    }
    
    return (
        <>
            <div className="card border border-2 shadow-sm-5 rounded-3 mb-2">
                <div className="card-body">
                    
                    <div className="d-flex justify-content-between align-items-center">

                        <h5 className="card-title">
                           {expense.Title}
                        </h5>
                        <h5 className="text-danger mb-0">
                            -₹{expense.amount}
                        </h5>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-primary">{expense.category}</span>

                        <small className="text-muted">{expense.date} . {expense.time}PM</small>
                    </div>
                    <p className="card-text text-muted mt-3">
                       {expense.description}
                    </p>
                    <div className="d-flex justify-content-end gap-2">

                        <button className="btn btn-outline-primary btn-sm"
                        onClick={handleEdit}>
                            <i className="bi bi-pencil me-1"></i>
                            Edit
                        </button>
                        <button className="btn btn-outline-danger btn-sm
                        "
                        onClick={handleDelete}>
                            <i className="bi bi-trash me-1"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ExpenseCard