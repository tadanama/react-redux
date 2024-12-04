import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create api post slice that use RTK query
export const postApiSlice = createApi({
	reducerPath: "post",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com",
	}),
	endpoints: (builder) => {
		return {
			getPosts: builder.query({
				// Fetch posts at "https://jsonplaceholder.typicode.com/posts"
				query: () => "/posts",
			}),
		};
	},
});

export const { useGetPostsQuery } = postApiSlice;
