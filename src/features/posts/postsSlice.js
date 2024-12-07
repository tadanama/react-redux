import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

// Set the initial state
// Object with an array of posts, status and error
const initialState = {
	posts: [],
	status: "idle", // Can be "idle", loading", "success" or "failed"
	error: null,
};

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// Creating an asynchronous action
export const fetchposts = createAsyncThunk("posts/fetchPosts", async () => {
	try {
		const result = await axios.get(POSTS_URL);
		// Value of the return below will be passed as the payload to the reducer
		return result.data;
	} catch (error) {
		// console.log("catch block fetchPosts asyncthunk");
		return error.message;
	}
});

export const addedAsyncPost = createAsyncThunk(
	"posts/addAsyncPost",
	async (newPost) => {
		try {
			console.log("inside add async post");
			console.log(newPost);
			const result = await axios.post(POSTS_URL, newPost);
			return result.data;
		} catch (error) {
			return error.message;
		}
	}
);

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addedPost: {
			reducer(state, action) {
				// Returns the action
				// {type: "posts/addedPost, payload:{}"}
				// console.log(action);

				// Display content of the payload
				// console.log(action.payload);

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
			const existingPost = state.posts.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			// execute reducer below when fetching posts
			.addCase(fetchposts.pending, (state) => {
				state.status = "loading";
				// console.log("fetchPosts is pending");
			})
			// execute reducer below when fetching posts is successfuly done
			.addCase(fetchposts.fulfilled, (state, action) => {
				state.status = "succeeded";
				// console.log("dalam fulfilled fetchPosts reducer");

				// Adding dates and reactions to the loaded posts
				// Doing it because the jsonplaceholder api don't provide some of the data we need
				let min = 1;

				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), { minutes: min++ }).toISOString();
					post.reactions = {
						likes: 0,
						dislikes: 0,
					};

					return post;
				});

				// Combine the initial state posts array with the loaded posts array
				// Set the posts state to the combined array
				state.posts = state.posts.concat(loadedPosts);
			})
			// execute reducer below if error happens when fetching
			.addCase(fetchposts.rejected, (state, action) => {
				// console.log("dalam rejected fetchPosts reducer");
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addedAsyncPost.fulfilled, (state, action) => {
				console.log("added post asynchronously");
				console.log(action.payload);
				action.payload.userId = Number(action.payload.userId);
				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					likes: 0,
					dislikes: 0,
				};
				state.posts.push(action.payload);
			});
	},
});

// Exporting the action creaters (an object with type field and payload if any)
export const { addedPost, addedReactions } = postSlice.actions;

// Exporting reducers to include in the store
export default postSlice.reducer;

// Selectors
// retrieves the posts array state from the post slice
export const selectAllPosts = (state) => state.post.posts;

// Retrieves the status
export const getPostStatus = (state) => state.post.status;

// Retrieves the error message
export const getPostError = (state) => state.post.error;

// Retrieves a post by id
export const selectPostbyId = (state, postId) =>
	state.post.posts.find((post) => post.id === postId);
