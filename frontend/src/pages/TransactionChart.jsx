import React from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "../index.css"; // Ensure the correct path

const TransactionChart = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p className="text-center text-gray-500">No transactions available</p>;
  }

  // Extract data dynamically
  const labels = transactions.map((tx) => tx.title);
  const amounts = transactions.map((tx) => tx.amount);
  const income = transactions.filter(tx => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);
  const expenses = transactions.filter(tx => tx.amount < 0).reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  // Category breakdown dynamically
  const categoryData = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
    return acc;
  }, {});

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  // Bar Chart - Transactions Overview
  const barData = {
    labels,
    datasets: [{ label: "Amount", data: amounts, backgroundColor: "rgba(75,192,192,0.6)" }],
  };

  // Pie Chart - Income vs. Expenses
  const pieData = {
    labels: ["Income", "Expenses"],
    datasets: [{ data: [income, expenses], backgroundColor: ["#4CAF50", "#FF5733"] }],
  };

  // Line Chart - Transaction Trends
  const lineData = {
    labels,
    datasets: [{ label: "Transaction Trend", data: amounts, borderColor: "#4287f5", fill: false }],
  };

  // Doughnut Chart - Category Breakdown
  const doughnutData = {
    labels: Object.keys(categoryData),
    datasets: [{ data: Object.values(categoryData), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"] }],
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <section className="features-section text-center p-5">
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-6 mb-4">
              <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Transaction Overview</h4>
                <div className="h-56">
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Income vs. Expenses</h4>
                <div className="h-56">
                  <Pie data={pieData} options={chartOptions} />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Transaction Trend</h4>
                <div className="h-56">
                  <Line data={lineData} options={chartOptions} />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card p-5 border border-gray-300 shadow-md min-h-[300px]">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Spending Categories</h4>
                <div className="h-56">
                  <Doughnut data={doughnutData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransactionChart;
