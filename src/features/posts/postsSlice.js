import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
	{
		id: 1,
		title: "I am learning redux",
		content: "Keep going, you are doing great!!",
		// Store the date in the format of a timestamp
		// Timestamp below is the timestamp of 10 minutes ago from the current timestamp
		date: sub(new Date(), { minutes: 10 }).toISOString(),
		reactions: {
			likes: 0,
			dislikes: 0,
		},
	},
	{
		id: 2,
		title: "You are on the right track",
		content: "Don't think negative of yourself and believe you can do it",
		// Timestamp below is the timestamp of 5 minutes ago from the current timestamp
		date: sub(new Date(), { minutes: 5 }).toISOString(),
		reactions: {
			likes: 0,
			dislikes: 0,
		},
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
						date: new Date().toISOString(),
						reactions: {
							likes: 0,
							dislikes: 0,
						},
					},
				};
			},
		},
		addedReactions: (state, action) => {
			// Destructure payload
			const { postId, reaction } = action.payload;
            // Retrieve the post with the given post id
            const existingPost = state.find(post => post.id === postId);
            if (existingPost){
                existingPost.reactions[reaction]++;
            }
		},
	},
});

// Exporting the action creaters (an object with type field and payload if any)
export const { addedPost, addedReactions } = postSlice.actions;

// Exporting reducers to include in the store
export default postSlice.reducer;

// Selectors
// retrieves the state from the post slice
export const selectAllPosts = (state) => state.post;
