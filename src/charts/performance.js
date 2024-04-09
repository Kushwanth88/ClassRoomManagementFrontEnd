import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export default function Performance({ scores }) {
  useEffect(() => {
    // Count of scores falling into different ranges
    const counts = {
      "Below 35": 0,
      "35 to 50": 0,
      "50 to 80": 0,
      "Above 80": 0,
    };

    scores.forEach((score) => {
      if (score < 35) {
        counts["Below 35"]++;
      } else if (score >= 35 && score <= 50) {
        counts["35 to 50"]++;
      } else if (score > 50 && score <= 80) {
        counts["50 to 80"]++;
      } else if (score > 80) {
        counts["Above 80"]++;
      }
    });

    // Chart data
    const data = {
      labels: Object.keys(counts),
      datasets: [
        {
          data: Object.values(counts),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    };

    // Creating a pie chart
    const ctx = document.getElementById("gradesChart");
    const chart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false, // Disable aspect ratio to allow custom width and height
      },
    });

    return () => {
      chart.destroy(); // Clean up chart when component unmounts
    };
  }, [scores]);

  return (
    <div className="container">
      <h2 className="text-center my-4">Performance</h2>
      <div className="my-4">
        <canvas id="gradesChart" width="400" height="400"></canvas> {/* Adjust width and height here */}
      </div>
    </div>
  );
}
