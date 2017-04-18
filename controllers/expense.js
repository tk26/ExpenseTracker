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

/**
 * GET /expense
 * Expense page.
 */
exports.getExpense = (req, res) => {
  res.render('expense/add', {
    title: 'Add Expense'
  });
};

/**
 * POST /expense
 * Add an Expense
 */
exports.postExpense = (req, res, next) => {
  const expense = new Expense({
    UserEmail: req.user.email,
    CreatedAt: new Date(),
    Amount: req.body.amount,
    Description: req.body.description
  });

  expense.save((err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Expense has been added.' });
      res.redirect('/expenses');
  });
};

/**
 * POST /expense/{id}
 * Update an Expense
 */
exports.updateExpense = (req, res, next) => {
  console.log("ID: "+ req.params.id);
  Expense.findOne({ _id : req.params.id }, (err, expense) => {
    if (err) { return next(err); }

    expense.Amount = req.body.amount;
    expense.Description = req.body.description;

	console.log("Expense Updated: "+expense);

    expense.save((err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Expense has been updated.' });
      res.redirect(req.get('referer'));
    });
  });
};

/**
 * POST /expense/delete/{id}
 * Delete an Expense
 */
exports.deleteExpense = (req, res, next) => {
  console.log("ID: "+ req.params.id);
  Expense.remove({ _id: req.params.id }, (err) => {
    if (err) { return next(err); }
    req.flash('info', { msg: 'Expense has been deleted.' });
    res.redirect('/expenses');
  });
};