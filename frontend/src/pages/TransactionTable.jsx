import React from "react";
import { Table, Button } from "react-bootstrap";

const TransactionTable = ({ transactions, onDelete }) => {
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
              <Button variant="danger" onClick={() => onDelete(tx._id)} className="rounded-pill px-4 py-1">Delete</Button> {/* Add Delete button */}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TransactionTable;