import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postsSlice";
import userReducer from "../features/users/usersSlice";

export const store = configureStore({
	reducer: {
		// The key below (post in this case) is the name that we will use to access the state later
		// state.<keyBelow> (state.post in this case)
		post: postReducer,
		user: userReducer,
	},
});
