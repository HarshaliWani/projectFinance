import React from "react";
import { Table, Button } from "react-bootstrap";

const TransactionTable = ({ transactions }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx, index) => (
          <tr key={index}>
            <td>{tx.date}</td>
            <td>{tx.title}</td>
            <td>{tx.amount}</td>
            <td>{tx.type}</td>
            <td>{tx.category}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TransactionTable;
