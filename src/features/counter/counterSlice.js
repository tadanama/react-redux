import { createSlice } from "@reduxjs/toolkit";

// Initial state of the counter
const initialState = {
	count: 0,
};

// When an application needs multiple state, we can divide them into slices
// If there is state for eg. posts and users,  each will need a slice to track their state
export const counterSlice = createSlice({
    // Slice name
	name: "counter",
	initialState,
    // Functions that will execute to change the state
    // Triggers when an action (dispatch hook) has occured
	reducers: {
		increment: (state) => {
			state.count += 1;
		},
		decrement: (state) => {
			state.count -= 1;
		},
		reset: (state) => {
			state.count = 0;
		},
		incrementByAmount: (state, action) => {
			state.count += action.payload.count;
		},
	},
});

export const { increment, decrement, reset, incrementByAmount } =
	counterSlice.actions;

export default counterSlice.reducer;
