import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, reset } from "./counterSlice";

function Counter() {
	// Retrieve the state from redux
	const count = useSelector((state) => state.counter.count);

	// Triggers an action
	const dispatch = useDispatch();

	return (
		<section>
			<p>{count}</p>
			<button>+</button>
			<button>-</button>

			<br />

			<input type="text" />

			<br />

			<button>Increment by amount</button>
			<button>Reset</button>
		</section>
	);
}

export default Counter;
