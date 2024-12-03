import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, reset, incrementAsync } from "./counterSlice";

function Counter() {
	// Retrieve the state from redux
	const count = useSelector((state) => state.counter.count);

	// Triggers an action
	const dispatch = useDispatch();

	// Track the state of the input
	const [incrementAmount, setIncrementAmount] = useState(0);

	// Returns the number if it is a number
	// If it is a string, returns NaN (falsy value)
	const addValue = Number(incrementAmount) || 0;

	return (
		<section>
			<p>{count}</p>
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrement())}>-</button>

			<br />

			<input
				type="text"
				value={incrementAmount}
				onChange={(event) => setIncrementAmount(event.target.value)}
			/>

			<br />

			<button onClick={() => dispatch(incrementByAmount(addValue))}>
				Increment by amount
			</button>
			<button onClick={() => dispatch(reset())}>Reset</button>
			{/* It will increment the counter by 100 after 1 sec */}
			<button onClick={() => dispatch(incrementAsync(100))}>Asynchronous increment</button>
		</section>
	);
}

export default Counter;
