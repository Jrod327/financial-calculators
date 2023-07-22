import FormComponent from "./FormComponent";
import { useState, useEffect } from "react";
import ChartComponent from "./ChartComponent";

export default function App() {
	const [price, setPrice] = useState(0);
	const [interestValues, setInterestValues] = useState([]);

	function handlePriceChange(newPrice) {
		setPrice(newPrice);
	}

	useEffect(() => {
		const interestRate = 0.1; // 10% interest rate

		const getCurrentYear = () => new Date().getFullYear();

		const calculateCompoundInterest = () => {
			const newInterestValues = [];
			let currentPrincipal = price;
			const currentYear = getCurrentYear();

			for (let year = currentYear; year <= currentYear + 50; year++) {
				const interest = currentPrincipal * interestRate;
				currentPrincipal += interest;
				newInterestValues.push({ year: year, amount: currentPrincipal });
			}
			console.log(newInterestValues);
			return newInterestValues;
		};

		const calculatedInterest = calculateCompoundInterest();
		setInterestValues(calculatedInterest);
	}, [price]);

	let lastAmount = interestValues[interestValues.length - 1]?.amount;

	lastAmount = parseFloat(lastAmount).toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	return (
		<>
			<div>
				<h1>True Cost</h1>
				<FormComponent onSubmit={handlePriceChange} />
				{price > 0 && ( // Check if interestValues has data
					<h2>
						After 50 years, your purchase of ${price} would have been worth ${lastAmount} if you invested it in the S&P 500
					</h2>
				)}
			</div>
			<div>{/* <ChartComponent chartData={interestValues} /> */}</div>
		</>
	);
}
