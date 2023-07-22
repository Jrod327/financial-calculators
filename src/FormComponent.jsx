import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function FormComponent({ onSubmit }) {
	const [inputValue, setInputValue] = useState("");

	function handleChange(e) {
		setInputValue(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const parsedValue = parseFloat(inputValue);
		if (!isNaN(parsedValue)) {
			onSubmit(parsedValue);
		}
		setInputValue("");
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3">
				<Form.Label>Enter the cost of an item you want to buy.</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter item's price"
					value={inputValue}
					onChange={handleChange}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}

export default FormComponent;
