import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

// Set the initial state
// Object with an array of posts, status and error
const initialState = {
	posts: [],
	status: "idle", 		// Can be "idle", loading", "success" or "failed"
	error: null
}

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
				state.posts.push(action.payload);
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
            const existingPost = state.posts.find(post => post.id === postId);
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
export const selectAllPosts = (state) => state.post.posts;
