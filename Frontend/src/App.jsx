
import './App.css'
import Signup from './Pages/Signup';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signin  from './Pages/Signin';
import AddExpense from './Pages/addExpense';
function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/addExpense" element={<AddExpense/>}/>
      </Routes>

     </BrowserRouter>
    </>
  )
}

export default App
