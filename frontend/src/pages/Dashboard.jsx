import React, { useState } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import TransactionTable from "./TransactionTable";
import TransactionChart from "./TransactionChart";
import TransactionForm from "./TransactionForm";

const Dashboard = () => {
  const [showTable, setShowTable] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Toggle between table and chart views
  const handleToggleView = () => {
    setShowTable(!showTable);
  };

  // Show/hide form modal
  const handleShowForm = () => setShowModal(true);
  const handleCloseForm = () => setShowModal(false);

  // Function to add a transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    handleCloseForm();
  };

  return (
    <Container className="mt-4 ">
      <Container className="mt-2 mb-4">
        <div className="mt-4 mb-4">
          <div className="d-flex justify-content-between mb-4">
            <Button onClick={handleToggleView}>
              {showTable ? "View Chart" : "View Table"}
            </Button>
            <Button variant="success" onClick={handleShowForm}>
              Add Expense
            </Button>
          </div>
        </div>
      </Container>

      {showTable ? (
        <TransactionTable transactions={transactions} />
      ) : (
        <TransactionChart transactions={transactions} />
      )}

      {/* Add Transaction Modal */}
      <Modal show={showModal} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm addTransaction={addTransaction} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
