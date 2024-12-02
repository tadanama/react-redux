import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, reset } from "./counterSlice";

function Counter() {
	// Retrieve the state from redux
	const count = useSelector((state) => state.counter.count);

	
}

export default Counter;
