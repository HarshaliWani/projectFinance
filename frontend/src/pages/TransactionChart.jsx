import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const TransactionChart = ({ transactions }) => {
  const data = {
    labels: transactions.map((tx) => tx.title),
    datasets: [
      {
        label: "Amount",
        data: transactions.map((tx) => tx.amount),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  return (
    <div>
      <h4>Transaction Overview</h4>
      <Bar data={data} />
    </div>
  );
};

export default TransactionChart;
