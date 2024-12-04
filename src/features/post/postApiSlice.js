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
			createPost: builder.mutation({ 
                // Create new post
                // Make a post request to "https://jsonplaceholder.typicode.com/posts"
                // Post that is in the arguments is passed using useCreatePostMutation custom hook
				query: (post) => ({
					url: "/post",
					method: "Post",
					body: post,
				}),
			}),
		};
	},
});

export const { useGetPostsQuery, useCreatePostMutation } = postApiSlice;
