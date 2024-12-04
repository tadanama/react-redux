import React from "react";
import { useGetPostsQuery } from "./postApiSlice";

function Posts() {
	// Get posts
	// Can be done by calling the postsApiSlice custom hook
	const { data: posts } = useGetPostsQuery();
	return (
		<div>
			<ul>
				{posts?.map((post) => {
					return <li key={post.id}>{post.title}</li>;
				})}
			</ul>
		</div>
	);
}

export default Posts;
