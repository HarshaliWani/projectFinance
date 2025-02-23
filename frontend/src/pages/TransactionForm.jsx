import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const TransactionForm = ({ addTransaction }) => {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    amount: "",
    type: "Expense",
    category: "Other",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(formData);
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
        <Form.Label>Type</Form.Label>
        <Form.Select name="type" onChange={handleChange}>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
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
      <Button variant="primary" type="submit" className="mt-2">
        Add Transaction
      </Button>
    </Form>
  );
};

export default TransactionForm;
