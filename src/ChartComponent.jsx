// import React from "react";
// import { Line } from "react-chartjs-2";

// export default function ChartComponent({ chartData }) {

// };

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Container } from "react-bootstrap";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

export default function ChartComponent({ chartData, price }) {
	const getCurrentYear = () => new Date().getFullYear();
	const labels = chartData.map(item => item.year);
	const amounts = chartData.map(item => item.amount);

	// const roundToNearest = (value, nearest) => {
	// 	return Math.round(value / nearest) * nearest;
	// };

	// ... (previous code)

	const maxAmount = Math.max(...amounts);
	let maxY;
	if (maxAmount > 20000) {
		maxY = Math.ceil(maxAmount / 5000) * 5000;
	} else if (maxAmount >= 1000 && maxAmount <= 19999) {
		maxY = Math.ceil(maxAmount / 1000) * 1000;
	} else {
		maxY = Math.ceil(maxAmount / 100) * 100;
	}

	// ... (rest of the code)

	const options = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				position: "bottom",
				labels: {
					color: "white" // Set the font color for the legend labels
				}
			},
			title: {
				display: false,
				text: "True Cost",
				color: "white"
			},
			fill: true
		},
		scales: {
			y: {
				min: price,
				max: maxY,
				title: {
					display: true,
					text: "Total Value",
					color: "white" // Set the font color for the y-axis label
				},
				ticks: {
					color: "white" // Set the font color for the y-axis tick labels
				},
				grid: {
					color: "#777"
				}
			},
			y1: {
				// Add a second y-axis configuration
				position: "right", // Position it on the right side
				min: price,
				max: maxY,
				ticks: {
					color: "white" // Set the font color for the y-axis tick labels on the right side
				},
				grid: {
					display: false // Hide gridlines for the second y-axis (optional)
				},
				title: {
					display: true,
					text: "Total Value", // You can customize the title for the second y-axis if needed
					color: "white" // Set the font color for the y-axis label on the right side
				}
			},
			x: {
				min: getCurrentYear(),
				max: getCurrentYear() + labels.length,
				ticks: {
					color: "white" // Set the font color for the x-axis tick labels
				},
				grid: {
					color: "#777"
				}
			}
		}
	};

	const data = {
		labels,
		datasets: [
			{
				label: "Value",
				data: chartData.map(item => item.amount),
				borderColor: "rgba(53, 200, 250, 0.8)",
				backgroundColor: "rgb(53, 162, 200)"
			}
		]
	};

	return <Line data={data} options={options} />;
}
