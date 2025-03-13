import React from "react";
import { Table, Button } from "react-bootstrap";
import '../index.css'; // Import the CSS file

const TransactionTable = ({ transactions, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Type</th>
          <th>Category</th>
          <th>Actions</th> {/* Add Actions column */}
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx, index) => (
          <tr key={index}>
            <td>{formatDate(tx.date)}</td>
            <td>{tx.title}</td>
            <td>{tx.amount}</td>
            <td>{tx.description}</td>
            <td>{tx.transactionType}</td>
            <td>{tx.category}</td>
            <td>
              <Button  onClick={() => onEdit(tx)} className="btn btn-light btn-outline-primary rounded-pill px-4 py-1 me-2">Edit</Button> {/* Add Edit button */}
              <Button  onClick={() => onDelete(tx._id)} className="btn btn-light btn-outline-danger rounded-pill px-4 py-1">Delete</Button> {/* Add Delete button */}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TransactionTable;