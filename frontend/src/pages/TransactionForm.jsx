import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { addTransactionAPI, editTransactionAPI } from "../utils/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure styles are included

const TransactionForm = ({ addTransaction, editTransaction, transactionToEdit, closeModal }) => {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    amount: "",
    description: "",
    transactionType: "expense",
    category: "Other",
  });

  useEffect(() => {
    if (transactionToEdit) {
      setFormData(transactionToEdit);
    }
  }, [transactionToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) {
      toast.error("Please fill all fields!");  // ✅ Using toast
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));  // ✅ Fetch user from localStorage

    if (!user || !user.id) {
      toast.error("User not found! Please log in again.");
      return;
    }
    const formattedData = { ...formData, date: new Date(formData.date).toISOString().split("T")[0], userId: user?.id };

    try {
      let response;
      if (transactionToEdit) {
        response = await editTransactionAPI(transactionToEdit._id, formattedData);
      } else {
        response = await addTransactionAPI(formattedData);
      }
      console.log("API Response:", response);
      if (!response || !response.success) {
        throw new Error(response?.message || "Unknown error");
      }
      toast.success(transactionToEdit ? "Transaction Edited!" : "Transaction Added!");
      if (transactionToEdit) {
        editTransaction(response.transaction);
      } else {
        addTransaction(response.transaction);
      }
      closeModal();
    } catch (error) {
      console.error("Transaction Error:", error);
      toast.error(transactionToEdit ? "Failed to edit transaction" : "Failed to add transaction");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Select name="transactionType" value={formData.transactionType} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select name="category" value={formData.category} onChange={handleChange}>
          <option value="Groceries">Groceries</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Medical">Medical</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2 rounded-pill px-4 ">
        {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
      </Button>
    </Form>
  );
};

export default TransactionForm;