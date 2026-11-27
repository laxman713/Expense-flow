
import './App.css'
import Signup from './Pages/Signup';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signin  from './Pages/Signin';
import AddExpense from './Pages/addExpense';
import ViewReports from "./Pages/viewReports";
import Leaderboard from './Pages/LeaderBoard';
import ResetPassword from './Pages/ResetPassword';
function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/addExpense" element={<AddExpense/>}/>
      <Route path="/view-reports" element={<ViewReports />} />
      <Route path="/leaderboard" element={<Leaderboard/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword />}/>
      </Routes>

     </BrowserRouter>
    </>
  )
}

export default App
