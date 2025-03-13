import React from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "../index.css"; // Ensure the correct path

const TransactionChart = ({ transactions, selectedCategory }) => {
  if (!transactions || transactions.length === 0) {
    return <p className="text-center text-gray-500">No transactions available</p>;
  }

  // Filter transactions based on selected category
  const filteredTransactions = selectedCategory === "All"
    ? transactions
    : transactions.filter(tx => tx.category === selectedCategory);

  // Extract data dynamically for expenses
  const expenseTransactions = filteredTransactions.filter(tx => tx.transactionType === "expense");
  const expenseLabels = expenseTransactions.map((tx) => tx.title);
  const expenseAmounts = expenseTransactions.map((tx) => tx.amount);
  const expenseDates = expenseTransactions.map((tx) => new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }));

  // Extract data dynamically for all transactions
  const labels = filteredTransactions.map((tx) => tx.title);
  const amounts = filteredTransactions.map((tx) => tx.amount);
  const income = filteredTransactions.filter(tx => tx.transactionType === "income").reduce((sum, tx) => sum + tx.amount, 0);
  const expenses = expenseTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  // Category breakdown dynamically
  const categoryData = filteredTransactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: function(context) {
            const index = context.dataIndex;
            const date = expenseDates[index];
            const amount = context.raw;
            return [`Date: ${date}`, `Amount: ${amount}`];
          }
        }
      }
    },
  };

  // Bar Chart - Expense Overview
  const barData = {
    labels: expenseLabels,
    datasets: [{ label: "Amount", data: expenseAmounts, backgroundColor: "rgba(75,192,192,0.6)" }],
  };

  // Pie Chart - Income vs. Expenses
  const pieData = {
    labels: ["Income", "Expenses"],
    datasets: [{ data: [income, expenses], backgroundColor: ["#4CAF50", "#FF5733"] }],
  };

  // Line Chart - Expense Trends
  const lineData = {
    labels: expenseLabels,
    datasets: [{ label: "Expense Trend", data: expenseAmounts, borderColor: "#4287f5", fill: false }],
  };

  // Doughnut Chart - Category Breakdown
  const doughnutData = {
    labels: Object.keys(categoryData),
    datasets: [{ data: Object.values(categoryData), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"] }],
  };

  // Bar Chart - Salary Overview
  const salaryTransactions = filteredTransactions.filter(tx => tx.category === "Salary");
  const salaryLabels = salaryTransactions.map((tx) => tx.title);
  const salaryAmounts = salaryTransactions.map((tx) => tx.amount);
  const salaryDates = salaryTransactions.map((tx) => new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }));

  const salaryBarData = {
    labels: salaryLabels,
    datasets: [{ label: "Amount", data: salaryAmounts, backgroundColor: "rgba(75,192,192,0.6)" }],
  };

  // Line Chart - Salary Trends
  const salaryLineData = {
    labels: salaryLabels,
    datasets: [{ label: "Salary Trend", data: salaryAmounts, borderColor: "#4287f5", fill: false }],
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <section className="features-section text-center p-5">
        <div className="container">
          <div className="row mt-4">
            {selectedCategory === "All" ? (
              <>
                <div className="col-md-6 mb-4">
                  <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Expense Overview</h4>
                    <div className="chart-container">
                      <Bar data={barData} options={chartOptions} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Income vs. Expenses</h4>
                    <div className="chart-container">
                      <Pie data={pieData} options={chartOptions} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Expense Trend</h4>
                    <div className="chart-container">
                      <Line data={lineData} options={chartOptions} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Spending Categories</h4>
                    <div className="chart-container">
                      <Doughnut data={doughnutData} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </>
            ) : selectedCategory === "Salary" ? (
              <>
                <div className="col-md-6 mb-4">
                  <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Salary Overview</h4>
                    <div className="chart-container">
                      <Bar data={salaryBarData} options={chartOptions} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Salary Trend</h4>
                    <div className="chart-container">
                      <Line data={salaryLineData} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-6 mb-4">
                  <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">{selectedCategory} Overview</h4>
                    <div className="chart-container">
                      <Bar data={barData} options={chartOptions} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">{selectedCategory} Trend</h4>
                    <div className="chart-container">
                      <Line data={lineData} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransactionChart;