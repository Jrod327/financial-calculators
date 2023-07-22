import React, { useState } from "react";

const CompoundInterestCalculator = ({ principal }) => {
	const interestRate = 0.1; // 10% interest rate

	const getCurrentYear = () => new Date().getFullYear();

	const calculateCompoundInterest = () => {
		const interestValues = [];
		let currentPrincipal = principal;
		const currentYear = getCurrentYear();

		for (let year = currentYear; year <= currentYear + 50; year++) {
			const interest = currentPrincipal * interestRate;
			currentPrincipal += interest;
			interestValues.push({ year, amount: currentPrincipal });
		}

		return interestValues;
	};

	const interestValues = calculateCompoundInterest();

	const lastAmount =
		interestValues[interestValues.length - 1].amount.toFixed(2);

	return (
		<div>
			{/* <h2>Compound Interest Calculator</h2>
			<table>
				<thead>
					<tr>
						<th>Year</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					{interestValues.map(({ year, amount }) => (
						<tr key={year}>
							<td>{year}</td>
							<td>${amount.toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</table> */}
			
		</div>
	);
};

export default CompoundInterestCalculator;
