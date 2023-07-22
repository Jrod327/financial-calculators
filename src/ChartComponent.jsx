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

export default function ChartComponent({ chartData }) {
	const getCurrentYear = () => new Date().getFullYear();
	const labels = chartData.map(item => item.year);
	const amounts = chartData.map(item => item.amount);

	// const roundToNearest = (value, nearest) => {
	// 	return Math.round(value / nearest) * nearest;
	// };

	const maxAmount = Math.max(...amounts);
	const roundedMaxAmount =
		Math.ceil(maxAmount > 20000 ? maxAmount / 5000 : maxAmount / 1000) *
		(maxAmount > 20000 ? 5000 : 1000);
	const minY = Math.min(0, roundedMaxAmount * 0.9);
	const maxY =
		Math.ceil(roundedMaxAmount / (maxAmount > 20000 ? 5000 : 1000)) *
		(maxAmount > 20000 ? 5000 : 1000);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "bottom"
			},
			title: {
				display: true,
				text: "True Cost"
			},
			fill: true
		},
		scales: {
			y: {
				min: minY,
				max: maxY
				// chartData[chartData.length - 1].amount
			},
			x: {
				min: getCurrentYear(),
				max: getCurrentYear() + labels.length
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
