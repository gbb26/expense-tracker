import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./UpdateExpense.css"; // Import the CSS file for styling
import ErrorMessage from "../../../components/Toasts/ErrorMessage";

const UpdateExpense = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const data = loc.state;
  const { id } = useParams();

  const [category, setCategory] = useState(data.category);
  const [amount, setAmount] = useState(data.amount);
  const [comments, setComments] = useState(data.comments);
  const [flag, setFlag] = useState(false);

  const handleSubmit = async (e) => {
    setFlag(false);
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            category,
            amount,
            comments,
          }),
        }
      );

      if (!response.ok) {
        setFlag(true);
        // Handle error responses
        const errorData = await response.json();
        throw new Error(errorData.message || "Error in Editing Expense");
      }
      const responseData = await response.json();
      console.log(responseData);
      navigate("/");
      location.reload();
    } catch (error) {
      console.error("Error Editing Expense:", error);
    }
  };

  return (
    <div className="update-expense-container">
      <h1 style={{ marginBottom: "30px" }}>Update Expense</h1>
      <form onSubmit={handleSubmit} className="update-expense-form">
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
        <button type="submit">Update Expense</button>
      </form>
      {flag && <ErrorMessage />}
    </div>
  );
};

export default UpdateExpense;
