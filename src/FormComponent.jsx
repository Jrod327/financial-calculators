import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function FormComponent({ onSubmit }) {
	const [inputValue, setInputValue] = useState("");
	function handleChange(e) {
		setInputValue(Number(e.target.value));
	}
	function handleSubmit(e) {
		e.preventDefault();
		onSubmit(Number(inputValue));
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
