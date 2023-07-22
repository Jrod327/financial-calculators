import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function FormComponent({ onSubmit, onYearsChange }) {
	const [priceValue, setPriceValue] = useState("");
	const [yearsValue, setYearsValue] = useState("");

	function handlePriceChange(e) {
		setPriceValue(e.target.value);
	}

	function handleYearsChange(e) {
		setYearsValue(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const parsedValue = parseFloat(priceValue);
		if (!isNaN(parsedValue)) {
			onSubmit(parsedValue);
		}
		if (!isNaN(parseInt(yearsValue))) {
			onYearsChange(yearsValue);
		}
		setYearsValue("");
		setPriceValue("");
	}

	return (
		<Form onSubmit={handleSubmit} className="mt-5">
			<Form.Group className="mb-3">
				<Form.Label>Enter the cost of an item:</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter item's price"
					value={priceValue}
					onChange={handlePriceChange}
				/>
			</Form.Group>
			<Form.Group className="mb-5">
				<Form.Label>Amount of years to invest:</Form.Label>
				<Form.Control
					type="number"
					placeholder="Enter amount of years"
					value={yearsValue}
					onChange={handleYearsChange}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}

export default FormComponent;
