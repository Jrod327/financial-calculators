import { useState } from "react";

//MAKE A WEBAPP THAT TAKES A PURCHASE AND CONVINCES YOU NOT TO BUY IT BY SHOWING A CHART.JS CHART
//OF WHAT THAT PURCHASE PRICE COULD DO IF IT WAS INVESTED IN THE STOCK MARKET OR HYSA. 
//SHOW HOW MANY TIMES YOU COULD PURCHASE THAT PRODUCT IN THE FUTURE FOR EACH 5 YEARS YOU'RE INVESTED

//ALSO SHOW WHAT YOU'LL PAY ON A LOAN OVER TIME IN INTEREST VS PRINCIPAL AND HIGHLIGHT HOW MUCH EXTRA IS PAID IN INTEREST

//MAYBE ALSO A SITE THAT SHOWS BEGINNERS HOW TO INVEST AND MAKE IT LESS SCARY FOR THEM. MAYBE HAVE KEY WORDS THAT YOU OPEN A MODAL WITH A LAYMANS EXPLANATION OF WHAT THEY MEAN

export default function App() {
	const [principal, setPrincipal] = useState("");
	const [interest, setInterest] = useState("");
	const [timesCompounded, setTimesCompounded] = useState("");
	const [time, setTime] = useState("");
	const [showResult, setShowResult] = useState(false);

	const result =
		principal *
		Math.pow(1 + interest / 100 / timesCompounded, timesCompounded * time);

	function handleResult(e) {
		e.preventDefault();
		setShowResult(true);
	}

	function handleReset() {
		setPrincipal("");
		setInterest("");
		setTimesCompounded("");
		setTime("");
		setShowResult(false);
	}

	return (
		<div>
			<form className="pure-form pure-form-aligned">
				<fieldset>
					<div className="pure-control-group">
						<label>Initial investment</label>
						<input
							type="text"
							value={principal}
							onChange={e => setPrincipal(Number(e.target.value))}
						/>
					</div>
					<div className="pure-control-group">
						<label>Expected interest rate</label>
						<input
							type="text"
							value={interest}
							onChange={e => setInterest(Number(e.target.value))}
						/>
					</div>
					<div className="pure-control-group">
						<label>How many times is interest compounded per year?</label>
						<input
							type="text"
							value={timesCompounded}
							onChange={e => setTimesCompounded(Number(e.target.value))}
						/>
					</div>
					<div className="pure-control-group">
						<label>Years to compound?</label>
						<input
							type="text"
							value={time}
							onChange={e => setTime(Number(e.target.value))}
						/>
					</div>
					<div className="pure-controls">
						<button
							type="submit"
							className="pure-button pure-button-primary"
							onClick={handleResult}>
							Submit
						</button>
						{showResult && (
							<h1>
								After {time} year(s), your initial investment of {principal} at
								a return of {interest}% per year would be worth $
								{Math.round(result)}
							</h1>
						)}
					</div>
				</fieldset>
			</form>

			<button className="pure-button pure-button-primary" onClick={handleReset}>
				Reset
			</button>
		</div>
	);
}
