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
	// When async thunk is defined, there are 3 states it will have
	// Pending when it is performing the async operation
	// Fulfilled when the async operation is completed
	// Rejection if there is an error when executing the async operation
	extraReducers: (builder) => {
		builder
			.addCase(incrementAsync.pending, () => {
				// Log the string when incrementAsync is pending
				// Wait 1 sec in this case because the promise is resolved after 1 sec
				console.log("Asynchronous increment is pending.");
			})
			.addCase(incrementAsync.fulfilled, (state, action) => {
				state.count += action.payload;
			});
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
