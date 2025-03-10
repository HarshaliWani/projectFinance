import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addTransactionAPI } from "../utils/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure styles are included

const TransactionForm = ({ addTransaction }) => {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    amount: "",
    description: "",
    transactionType: "expense",
    category: "Other",
  });

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
      const response = await addTransactionAPI(formattedData);
      console.log("API Response:", response);
      if (!response || !response.success) {
        throw new Error(response?.message || "Unknown error");
      }
      toast.success("Transaction Added!");
      addTransaction(response.transaction); // Add transaction to state
    } catch (error) {
      console.error("Add Transaction Error:", error);
      toast.error("Failed to add transaction");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="date" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" name="amount" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Select name="transactionType" onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select name="category" onChange={handleChange}>
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
        Add Transaction
      </Button>
    </Form>
  );
};

export default TransactionForm;