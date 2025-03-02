const Transaction = require("../models/transaction");
const User = require("../models/user");
const moment = require("moment");

// ✅ Add Transaction
const addTransactionController = async (req, res) => {
  try {
    const { title, amount, description, date, category, transactionType } = req.body;

    // Check if required fields are provided
    if (!title || !amount || !description || !date || !category || !transactionType) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Create and save new transaction
    const newTransaction = await Transaction.create({
      title,
      amount,
      category,
      description,
      date,
      user: req.user._id,
      transactionType,
    });

    // Add transaction to user's list and save user
    req.user.transactions.push(newTransaction);
    await req.user.save();

    return res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      transaction: newTransaction,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Get All Transactions for a User
const getAllTransactionController = async (req, res) => {
    try {
      const { type, frequency, startDate, endDate } = req.body;
  
      // Build query based on filters
      const query = { user: req.user._id };
      if (type && type !== "all") query.transactionType = type;
  
      if (frequency && frequency !== "custom") {
        query.date = { $gt: moment().subtract(Number(frequency), "days").toDate() };
      } else if (startDate && endDate) {
        query.date = { $gte: moment(startDate).toDate(), $lte: moment(endDate).toDate() };
      }
  
      // Get transactions from DB
      const transactions = await Transaction.find(query);
  
      return res.status(200).json({
        success: true,
        transactions,
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

// ✅ Delete Transaction
const deleteTransactionController = async (req, res) => {
  try {
    const transactionId = req.params.id;

    // Find and delete transaction
    const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
    if (!deletedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Remove transaction from user's list
    req.user.transactions = req.user.transactions.filter((tx) => tx._id.toString() !== transactionId);
    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "Transaction successfully deleted",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Update Transaction
const updateTransactionController = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { title, amount, description, date, category, transactionType } = req.body;

    // Find transaction
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Update transaction fields
    transaction.title = title || transaction.title;
    transaction.amount = amount || transaction.amount;
    transaction.description = description || transaction.description;
    transaction.date = date || transaction.date;
    transaction.category = category || transaction.category;
    transaction.transactionType = transactionType || transaction.transactionType;

    await transaction.save();

    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addTransactionController,
  getAllTransactionController,
  deleteTransactionController,
  updateTransactionController,
};