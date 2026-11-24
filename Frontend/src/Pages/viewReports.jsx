import ExpenseCard from "../components/expenseCard";
import { useState,useRef,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import getExpenseService from "../services/expenseGetService";
import deleteExpenseService from "../services/expenseDeleteService";

function ViewReports(){
    const observerRef = useRef(null);
    const navigate = useNavigate();
    
const [visible,setVisible] = useState(2);
const [expenses, setExpenses] = useState([]);
const [loading, setLoading] = useState(true);
const [editExpense,setEditExpense] = useState(null);
const [deleteExpense,setDeleteExpense] = useState(null);

function handleEdit(expense){
    setEditExpense(expense);
    navigate("/addExpense",{
        state:{expense: expense}
    })
    console.log(expense.id);
}

async function handleDelete(expenseId){
    const isConfirmed = window.confirm(
        "Are you sure you want to delete this expense?"
    );

    if (!isConfirmed) {
        return;
    }
     try {
        const result = await deleteExpenseService(expenseId);
        console.log("Delete response:", result);
         setExpenses((prev) =>
            prev.filter((expense) => expense.id !== expenseId)
        );
    } catch (error) {
        console.log("Error deleting expense:", error);
    }
}


useEffect(() => {
    const fetchExpenses = async () => {
        try {
            const result = await getExpenseService();
            setExpenses(result);
        } catch (error) {
            console.log("Error fetching expenses:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchExpenses();
}, []);
useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
       
        const entry = entries[0];
        if(entry.isIntersecting){
            console.log("User reached the bottem")
            setVisible((prev)=>prev+10);
        }

    })
    observer.observe(observerRef.current);
    return() => observer.disconnect();

},[visible]);
    return(
        <>
<div className="container mt-4">
            <h2>View Reports</h2>
            {editExpense && (
            <div className="alert alert-info">
                Editing : {editExpense.Title}
            </div>
        )}  
            {expenses.slice(0,visible).map((expense)=>(
                <ExpenseCard 
                   key={expense.id}
                   expense={expense}
                   onEdit={handleEdit}
                   onDelete={handleDelete}/>
            ))}
            <div ref={observerRef}></div>
        </div> 
           
          </> 
    )
}
export default ViewReports;