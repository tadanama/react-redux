import { createSlice, nanoid } from "@reduxjs/toolkit";

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

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addedPost: {
			reducer(state, action) {
				// Returns the action
				// {type: "posts/addedPost, payload:{}"}
				console.log(action);
				// Display content of the payload
				console.log(action.payload);
				// Appending the array
				// Did'nt have to specify state.post because already inside the post slice
				state.push(action.payload);
			},
            // Format the payload
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						userId,
					},
				};
			},
		},
	},
});

// Exporting the action creaters (an object with type field and payload if any)
export const { addedPost } = postSlice.actions;

// Exporting reducers to include in the store
export default postSlice.reducer;

// Selectors
// retrieves the state from the post slice
export const selectAllPosts = (state) => state.post;
