import React from "react";
import { Bar } from "react-chartjs-2";

const PerformanceBar = ({ assignmentIds, scores }) => {
  // Function to aggregate scores by assignment ID
  const aggregateScoresByAssignment = () => {
    const aggregatedScores = {};

    // Iterate through assignment IDs and corresponding scores
    assignmentIds.forEach((assignmentId, index) => {
      if (!aggregatedScores[assignmentId]) {
        aggregatedScores[assignmentId] = [];
      }
      aggregatedScores[assignmentId].push(scores[index]);
    });

    return Object.values(aggregatedScores);
  };

  // Calculate average score for each assignment
  const averageScores = aggregateScoresByAssignment().map(scores =>
    scores.reduce((total, score) => total + score, 0) / scores.length
  );

  // Data for the bar chart
  const data = {
    labels: assignmentIds.map(id => `Assignment ${id}`),
    datasets: [
      {
        label: "Average Score",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: averageScores
      }
    ]
  };

  // Options for the bar chart
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Performance</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PerformanceBar;
