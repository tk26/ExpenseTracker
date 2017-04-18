/**
 * GET /expenses
 * List all expenses.
 */
const Expense = require('../models/Expense');

exports.getExpenses = (req, res) => {
  console.log("Logged In User Email: "+req.user.email + " Role: " + req.user.role);
  if(req.user.role == 0){
  	Expense.find((err, docs) => {
    res.render('expense/expenses', { title: 'All Expenses', expenses: docs });
  	});	
  }
  else{
  	Expense.find({ UserEmail: req.user.email }, (err, docs) => {
	  res.render('expense/expenses', { title: 'All Expenses', expenses: docs });
  	});
  }
  
};

/**
 * GET /expense/{id}
 * List an Expense
 */
exports.getExpenseById = (req, res) => {
  console.log("ID: "+ req.params.id);
  Expense.findOne( { _id : req.params.id }, (err, expense) => {
    if (err) { 
    	console.log(err);
    }
    
    console.log("Expense: "+expense);

    res.render('expense/expense', {
    	title: 'Expense',
    	expense: expense
    });
  });
};