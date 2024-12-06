import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{
		id: 1,
		title: "I am learning redux",
		content: "Keep going, you are doing great!!",
	},
	{
		id: 2,
		title: "You are on the right track",
		content: "Don't think negative of yourself and believe you can do it",
	},
];

const postApiSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
});

// Exporting the action creaters (an object with type field and payload if any)
export const {} = postApiSlice.actions;

// Exporting reducers to include in the store
export default postApiSlice.reducer;

// Selectors
// retrieves the state from the post slice
export const selectAllPosts = (state) => state.post;
