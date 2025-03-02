const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  addTransactionController,
  getAllTransactionController,
  deleteTransactionController,
  updateTransactionController,
} = require("../controllers/transactionController.js");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Transaction Validation Middleware
const validateTransaction = [
  check("title").not().isEmpty().withMessage("Title is required"),
  check("amount").isNumeric().withMessage("Amount must be a number"),
  check("date").isISO8601().withMessage("Invalid date format"),
  check("category").not().isEmpty().withMessage("Category is required"),
  check("transactionType")
    .isIn(["income", "expense"])
    .withMessage("Transaction type must be 'income' or 'expense'"),
];

// ✅ Add Transaction Route with Validation
router.post("/addTransaction", authMiddleware, validateTransaction, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  addTransactionController(req, res);
});

// ✅ Other Transaction Routes
router.get("/getTransaction", authMiddleware, getAllTransactionController);
router.delete("/deleteTransaction/:id", authMiddleware, deleteTransactionController);
router.put("/updateTransaction/:id", authMiddleware, validateTransaction, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  updateTransactionController(req, res);
});

module.exports = router;