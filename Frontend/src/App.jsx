
import './App.css'
import Signup from './Pages/Signup';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signin  from './Pages/Signin';
import AddExpense from './Pages/addExpense';
import ViewReports from "./Pages/viewReports";
function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/addExpense" element={<AddExpense/>}/>
      <Route path="/view-reports" element={<ViewReports />} />
      </Routes>

     </BrowserRouter>
    </>
  )
}

export default App
