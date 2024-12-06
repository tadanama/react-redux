import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postsSlice";

export const store = configureStore({
	reducer: {
		// The key below (post in this case) is the name that we will use to access the state later
		// state.<keyBelow> (state.post in this case)
		post: postReducer,
	},
});
