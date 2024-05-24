import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import AddExpense from "./pages/expenses/AddExpense/AddExpense";
import UpdateExpense from "./pages/expenses/UpdateExpense/UpdateExpense";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/login"
          exact
          element={localStorage.getItem("token") ? <Home /> : <Login />}
        />
        <Route
          path="/signup"
          exact
          element={localStorage.getItem("token") ? <Home /> : <Signup />}
        />
        <Route path="/add-expense" exact element={<AddExpense />} />
        <Route path="/update-expense/:id" exact element={<UpdateExpense />} />
      </Routes>
    </div>
  );
}

export default App;
