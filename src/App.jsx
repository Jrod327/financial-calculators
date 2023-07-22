import FormComponent from "./FormComponent";
import { useState, useEffect } from "react";
import ChartComponent from "./ChartComponent";
import { Container } from "react-bootstrap";

export default function App() {
	const [price, setPrice] = useState(0);
	const [interestValues, setInterestValues] = useState([]);
	const [years, setYears] = useState(1);

	function handlePriceChange(newPrice) {
		setPrice(newPrice);
	}

	function handleYearsChange(newYears) {
		setYears(Number(newYears));
	}

	useEffect(() => {
		const interestRate = 0.1; // 10% interest rate

		const getCurrentYear = () => new Date().getFullYear();

		const calculateCompoundInterest = () => {
			const newInterestValues = [];
			let currentPrincipal = price;
			const currentYear = getCurrentYear();

			for (let year = currentYear; year <= currentYear + years - 1; year++) {
				const interest = currentPrincipal * interestRate;
				currentPrincipal += interest;
				newInterestValues.push({ year: year, amount: currentPrincipal });
			}
			console.log(newInterestValues);
			return newInterestValues;
		};

		const calculatedInterest = calculateCompoundInterest();
		setInterestValues(calculatedInterest);
	}, [price, years]);

	console.log("interest values:", interestValues);

	let lastAmount = interestValues[interestValues.length - 1]?.amount;

	lastAmount = parseFloat(lastAmount).toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	return (
		<Container className="w-75 mx-auto vh-100">
			<div className="container pt-5">
				<h1 className="text-center mb-4">True Cost</h1>
				<FormComponent
					onSubmit={handlePriceChange}
					onYearsChange={handleYearsChange}
				/>
				{price > 0 && ( // Check if interestValues has data
					<>
						<h2 className="mt-5">
							After <span className="text-info">{years} years</span>, your
							purchase of <span className="text-danger">${price}</span> would
							have been worth{" "}
							<span className="text-success">${lastAmount}</span> if you
							invested it in the S&P 500.
						</h2>
						<h7>
							<em>
								Assuming an average return of 10% annually, which historically
								is the rate with dividends reinvested.
							</em>
						</h7>
					</>
				)}
			</div>
			<div className="mt-4">
				<ChartComponent chartData={interestValues} />
			</div>
		</Container>
	);
}
