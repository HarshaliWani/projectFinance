import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import TransactionTable from "./TransactionTable";
import TransactionChart from "./TransactionChart";
import TransactionForm from "./TransactionForm";
import { getTransactionsAPI, deleteTransactionAPI } from "../utils/ApiService";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [showTable, setShowTable] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactionsAPI();
        console.log("Get Transactions API Response:", response); // Debugging Line
        if (response.success) {
          setTransactions(response.transactions);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.log("Fetch Transactions Error:", error);
      }
    };
    fetchTransactions();
  }, []);

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

  const deleteTransaction = async (id) => {
    try {
      const response = await deleteTransactionAPI(id);
      if (response.success) {
        setTransactions(transactions.filter(tx => tx._id !== id));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log("Delete Transaction Error:", error);
    }
  };

  // Filter transactions based on selected category and date range
  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const isCategoryMatch = selectedCategory === "All" || tx.category === selectedCategory;
    const isDateMatch =
      (!startDate || txDate >= new Date(startDate)) &&
      (!endDate || txDate <= new Date(endDate));
    return isCategoryMatch && isDateMatch;
  });

  return (
    <Container className="mt-4">
      <Container className="mt-2 mb-4">
        <div className="mt-4 mb-4">
          <div className="d-flex justify-content-between mb-4">
            <Button onClick={handleToggleView} className="btn btn-primary rounded-pill px-4">
              {showTable ? "View Chart" : "View Table"}
            </Button>
            <Button variant="success" onClick={handleShowForm} className="rounded-pill px-4">
              Add Expense
            </Button>
          </div>
        </div>
      </Container>

      <Row className="mb-4">
        <Col md={4}>
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            {[...new Set(transactions.map((tx) => tx.category))].map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </Col>
        <Col md={4}>
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Col>
      </Row>

      {showTable ? (
        <TransactionTable transactions={filteredTransactions} onDelete={deleteTransaction} />
      ) : (
        <TransactionChart transactions={filteredTransactions} />
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