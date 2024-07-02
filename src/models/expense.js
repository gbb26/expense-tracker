const mongoose = require('mongoose')
// Input fields: Category, Amount, Comments (optional).
const expenseSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})
const Expense = mongoose.model('Expenses', expenseSchema);
module.exports = Expense;
