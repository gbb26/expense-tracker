import { Link, useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file for styling
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [expenseData, setExpenseData] = useState([]);
  const deleteExpense = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      location.reload();
    } catch (error) {
      console.error("Error deleting expenses:", error);
    }
  };
  const fetchExpenses = async () => {
    try {
      if (localStorage.getItem("token")) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/expenses`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          // Handle HTTP errors
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setExpenseData(data.expense);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      {localStorage.getItem("token") ? (
        <div>
          <div className="home-container">
            <button className="add-expense-btn">
              <Link to="/add-expense">Add Expense</Link>
            </button>
            <div className="table-container">
              <table className="expenses-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount(INR)</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseData &&
                    expenseData.map((expense) => (
                      <tr key={expense._id}>
                        <td>{expense.category}</td>
                        <td>{expense.amount}</td>
                        <td>{new Date(expense.createdAt).toLocaleString()}</td>
                        <td>{new Date(expense.updatedAt).toLocaleString()}</td>
                        <td>{expense.comments}</td>
                        <td>
                          <Link
                            to={`/update-expense/${expense._id}`}
                            state={expense}
                          >
                            <button className="update-button">Update</button>
                          </Link>
                          <button
                            className="delete-button"
                            onClick={() => deleteExpense(expense._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <h1></h1>
      )}
    </>
  );
};

export default Home;
