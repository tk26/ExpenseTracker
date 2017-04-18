const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  //_id: { type: String },
  Amount : Number,
  Description: String,
  CreatedAt: { type: Date, default: Date.now },
  UserEmail: String
}, 
{
    timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;