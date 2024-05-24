const express = require("express");
const { validateUserData, validateLoginData } = require("../middlewares/auth");
const { validateAddExpenseData, validateUpdateExpenseData } = require("../middlewares/expense");
const { signUpUser, loginUser, logOutUser } = require("../controllers/auth");
const { authToken } = require("../helpers/jwt-token");
const { addExpense,
    getExpense,
    updateExpense,
    deleteExpense
} = require("../controllers/expense");

const router = express.Router();

// auth
router.post("/auth/register", validateUserData, signUpUser);
router.patch("/auth/login", validateLoginData, loginUser);
router.use(authToken);
router.patch("/auth/logout", logOutUser);

// expenses
router.post("/expenses", validateAddExpenseData, addExpense);
router.get("/expenses", getExpense);
router.patch("/expenses/:expenseID", validateUpdateExpenseData, updateExpense);
router.delete("/expenses/:expenseID", deleteExpense);

module.exports = router;