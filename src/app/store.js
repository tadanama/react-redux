import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { postApiSlice } from "../features/post/postApiSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		[postApiSlice.reducerPath]: postApiSlice.reducer,
	},
	// Middleware enables caching functionality
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(postApiSlice.middleware);
	},
});
