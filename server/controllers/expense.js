const Expense = require('../models/expense');
const addExpense = async (req, res) => {
    try {
        const expenseDataToSave = {
            userID: req?.body?.userID,
            category: req?.body?.category,
            amount: req?.body?.amount,
            comments: req?.body?.comments
        }
        const exp = new Expense(expenseDataToSave);
        await exp.save();

        res.status(201).json({ message: 'expense details added successfully', data: exp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getExpense = async (req, res) => {
    try {
        const { userID } = req?.body;
        const expense = await Expense.find({ userID: userID }, {}).sort({ createdAt: -1 });
        return res.status(201).json({ expense: expense })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getExpenseByCategory = async (req, res) => {
    try {
        const { userID } = req?.body;
        // Fetch all expenses for the user

        const expenses = await Expense.find({ userID: userID }, { category: 1, amount: 1 });

        // Process data to group by category and sum the amounts
        const expensesByCategory = expenses.reduce((acc, expense) => {
            if (!acc[expense.category]) {
                acc[expense.category] = 0;
            }
            acc[expense.category] += expense.amount;
            return acc;
        }, {});

        // Convert the result into the desired format
        const result = Object.keys(expensesByCategory).map(category => ({
            category: category,
            totalAmount: expensesByCategory[category]
        }));
        console.log(result);
        return res.status(201).json({ expense: result });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

const updateExpense = async (req, res) => {
    try {
        const { userID, category, amount, comments } = req.body;
        const { expenseID } = req.params;
        // Find and update the cart item
        const result = await Expense.findOneAndUpdate(
            { userID: userID, _id: expenseID },
            { $set: { category: category, amount: amount, comments: comments } }, // Update values
            { new: true } // Return the updated document
        );

        if (!result) {
            return res.status(404).json({ error: 'expense details not found or user not found' });
        }
        res.json({ message: 'expense details updated successfully', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const { expenseID } = req.params;
        const { userID } = req.body;
        // Find and update the cart to remove the specified cart item
        const result = await Expense.findOneAndDelete({ userID: userID, _id: expenseID });
        console.log(result);
        if (!result) {
            return res.status(404).json({ error: 'expense details not found or user not found' });
        }

        res.json({ message: 'expense details deleted successfully', expense: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = {
    addExpense,
    getExpense,
    getExpenseByCategory,
    updateExpense,
    deleteExpense,
};