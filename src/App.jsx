import FormComponent from "./FormComponent";
import CompoundInterestCalculator from "./CompoundInteretCalculator";
import { useState } from "react";

export default function App() {
	const [price, setPrice] = useState(15);

	function handlePriceChange(newPrice) {
		setPrice(newPrice);
	}

	return (
		<>
			<h1>True Cost</h1>
			<CompoundInterestCalculator principal={price}/>
			<FormComponent onSubmit={handlePriceChange} />
		</>
	);
}
