import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
	// Synchronous action below inside the reducer is actually named counter/increment "<sliceName>/<actionName>"
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
			// Takes the paylaod from the action
			// Set it to the value of the current state
			state.count += action.payload;
		},
	},
});

// Defining an async action
export const incrementAsync = createAsyncThunk(
	"counter/incrementAsync",
	async (amount) => {
		// Resolve a promise after 1 sec to simulate async operations
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// Return the amount from the payload
		return amount;
	}
);


export const { increment, decrement, reset, incrementByAmount } =
	counterSlice.actions;

export default counterSlice.reducer;
