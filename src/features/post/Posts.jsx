import React from "react";
import { useGetPostsQuery, useCreatePostMutation } from "./postApiSlice";

function Posts() {
	// Get posts
	// Can be done by calling the postsApiSlice custom hook
	const { data: posts } = useGetPostsQuery();

    // Mutation custom hook
	// First item in the array after destructuring is the actual function inside postApiSlice
	// Second is an object containing function execution status
	const [createPostMutation, { isLoading: isCreatingPost }] = useCreatePostMutation();

	return (
		<div>
			<button
				onClick={() => {
					const newPost = { title: "I am happy" };

                    // Function below will trigger the mutation endpoint
                    // New post is provided as the argument
					createPostMutation(newPost);
				}}
			>
                {/* If the createPostMutation function is triggered, it will be in a loading state */}
                {/* Render different strings depending on whether custom hook loading or not  */}
				{isCreatingPost ? "Creating..." : "Create post"}
			</button>
			<ul>
				{posts?.map((post) => {
					return <li key={post.id}>{post.title}</li>;
				})}
			</ul>
		</div>
	);
}

export default Posts;
