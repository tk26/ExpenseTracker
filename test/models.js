const mongoose = require('mongoose');
const {expect} = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');

const User = require('../models/User');
const Expense = require('../models/Expense');

describe('User Model', () => {
  it('should create a new user', (done) => {
    const UserMock = sinon.mock(new User({ email: 'test@gmail.com', password: 'root' }));
    const user = UserMock.object;

    UserMock
      .expects('save')
      .yields(null);

    user.save(function (err, result) {
      UserMock.verify();
      UserMock.restore();
      expect(err).to.be.null;
      done();
    });
  });

  it('should return error if user is not created', (done) => {
    const UserMock = sinon.mock(new User({ email: 'test@gmail.com', password: 'root' }));
    const user = UserMock.object;
    const expectedError = {
      name: 'ValidationError'
    };

    UserMock
      .expects('save')
      .yields(expectedError);

    user.save((err, result) => {
      UserMock.verify();
      UserMock.restore();
      expect(err.name).to.equal('ValidationError');
      expect(result).to.be.undefined;
      done();
    });
  });

  it('should not create a user with the unique email', (done) => {
    const UserMock = sinon.mock(User({ email: 'test@gmail.com', password: 'root' }));
    const user = UserMock.object;
    const expectedError = {
      name: 'MongoError',
      code: 11000
    };

    UserMock
      .expects('save')
      .yields(expectedError);

    user.save((err, result) => {
      UserMock.verify();
      UserMock.restore();
      expect(err.name).to.equal('MongoError');
      expect(err.code).to.equal(11000);
      expect(result).to.be.undefined;
      done();
    });
  });

  it('should find user by email', (done) => {
    const userMock = sinon.mock(User);
    const expectedUser = {
      _id: '5700a128bd97c1341d8fb365',
      email: 'test@gmail.com'
    };

    userMock
      .expects('findOne')
      .withArgs({ email: 'test@gmail.com' })
      .yields(null, expectedUser);

    User.findOne({ email: 'test@gmail.com' }, (err, result) => {
      userMock.verify();
      userMock.restore();
      expect(result.email).to.equal('test@gmail.com');
      done();
    })
  });

  it('should remove user by email', (done) => {
    const userMock = sinon.mock(User);
    const expectedResult = {
      nRemoved: 1
    };

    userMock
      .expects('remove')
      .withArgs({ email: 'test@gmail.com' })
      .yields(null, expectedResult);

    User.remove({ email: 'test@gmail.com' }, (err, result) => {
      userMock.verify();
      userMock.restore();
      expect(err).to.be.null;
      expect(result.nRemoved).to.equal(1);
      done();
    })
  });
});

describe('Expense Model', () => {
  it('should create a new expense', (done) => {
    const ExpenseMock = sinon.mock(new Expense({ Amount: 2.3, Description: 'Test Expense', CreatedBy: 'test@gmail.com'}));
    const expense = ExpenseMock.object;

    ExpenseMock
      .expects('save')
      .yields(null);

    expense.save(function (err, result) {
      ExpenseMock.verify();
      ExpenseMock.restore();
      expect(err).to.be.null;
      done();
    });
  });

  it('should find expense by id', (done) => {
    const expenseMock = sinon.mock(Expense);
    const expectedExpense = {
      _id: '5700a128bd97c1341d8fb365'
    };

    expenseMock
      .expects('findOne')
      .withArgs({ _id: '5700a128bd97c1341d8fb365' })
      .yields(null, expectedExpense);

    Expense.findOne({ _id: '5700a128bd97c1341d8fb365' }, (err, result) => {
      expenseMock.verify();
      expenseMock.restore();
      expect(result._id).to.equal('5700a128bd97c1341d8fb365');
      done();
    });
  });

  it('should find expense by email', (done) => {
    const expenseMock = sinon.mock(Expense);
    const expectedExpense = {
      _id: '5700a128bd97c1341d8fb365',
      CreatedBy: 'test@gmail.com'
    };

    expenseMock
      .expects('findOne')
      .withArgs({ CreatedBy: 'test@gmail.com' })
      .yields(null, expectedExpense);

    Expense.findOne({ CreatedBy: 'test@gmail.com' }, (err, result) => {
      expenseMock.verify();
      expenseMock.restore();
      expect(result.CreatedBy).to.equal('test@gmail.com');
      done();
    });
  });

  it('should remove expense by id', (done) => {
    const expenseMock = sinon.mock(Expense);
    const expectedResult = {
      nRemoved: 1
    };

    expenseMock
      .expects('remove')
      .withArgs({ _id: '5700a128bd97c1341d8fb365' })
      .yields(null, expectedResult);

    Expense.remove({ _id: '5700a128bd97c1341d8fb365' }, (err, result) => {
      expenseMock.verify();
      expenseMock.restore();
      expect(err).to.be.null;
      expect(result.nRemoved).to.equal(1);
      done();
    })
  });
});