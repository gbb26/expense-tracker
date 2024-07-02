import { useState } from "react";
import "./AddExpense.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../components/Toasts/ErrorMessage";

const AddExpense = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [comments, setComments] = useState("N.A.");
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setFlag(false);
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          category,
          amount,
          comments,
        }),
      });

      if (!response.ok) {
        // Handle error responses
        setFlag(true);
        const errorData = await response.json();
        throw new Error(errorData.message || "Error in Adding Expense");
      }
      const responseData = await response.json();
      console.log(responseData);
      navigate("/");
      location.reload();
      // Redirect user or perform any other action as needed after successful login
    } catch (error) {
      console.error("Error Adding Expense:", error);
    }
  };
  return (
    <div className="add-expense-container">
      <h1 style={{ marginBottom: "30px" }}>Add Expense</h1>
      <form onSubmit={handleSubmit} className="add-expense-form">
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            min={0}
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments (Optional):</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
      {flag && <ErrorMessage />}
    </div>
  );
};

export default AddExpense;
