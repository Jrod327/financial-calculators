import FormComponent from "./FormComponent";
import { useState, useEffect } from "react";
import ChartComponent from "./ChartComponent";

export default function App() {
	const [price, setPrice] = useState(15);
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
				newInterestValues.push({ year, amount: currentPrincipal });
			}

			return newInterestValues;
		};

		const calculatedInterest = calculateCompoundInterest();
		setInterestValues(calculatedInterest);
	}, [price]);

	const lastAmount =
		interestValues[interestValues.length - 1].amount.toFixed(2);

	return (
		<>
			<div>
				<h1>True Cost</h1>

				<FormComponent onSubmit={handlePriceChange} />
				<h2>
					After 50 years, your purchase of ${price} is worth ${lastAmount}
				</h2>
			</div>
			<div>
				<ChartComponent chartData={interestValues} />
			</div>
		</>
	);
}
