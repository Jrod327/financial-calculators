import FormComponent from "./FormComponent";
import { useState, useEffect } from "react";
import ChartComponent from "./ChartComponent";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

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

	function handleReset() {
		setPrice(0);
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
				newInterestValues.push({
					year: year,
					amount: currentPrincipal.toFixed(2)
				});
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
		<Container className="w-75 mx-auto">
			<div className="container pt-5">
				<h1 className="text-center mb-5">True Cost of Spending</h1>

				{price == 0 && (
					<>
						<p>
							<em>
								If you want to see how much money you're missing out on in the
								future by spending it on BS today, enter the price of the BS and
								how many years of investment you want to check.
							</em>
						</p>
						<FormComponent
							onSubmit={handlePriceChange}
							onYearsChange={handleYearsChange}
						/>
					</>
				)}
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
			{price > 0 && (
				<>
					<br />
					<div className="d-flex justify-content-center mt-2">
						<Button variant="primary" onClick={handleReset}>
							Reset to check another item!
						</Button>
					</div>

					<br />
					<div>
						<ChartComponent chartData={interestValues} price={price} />
					</div>
				</>
			)}
		</Container>
	);
}
