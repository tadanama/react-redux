import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { selectPostsByUserId } from "../posts/postsSlice";

function UserPage() {
	// Retrieve the userId;
	const { userId } = useParams();
	console.log(userId);
	console.log(typeof(userId));

	// Retrieve post for the by userId
	const userPosts = useSelector((state) =>
		selectPostsByUserId(state, Number(userId))
	);
    console.log(userPosts);

	const renderedUserPost = userPosts.map((post) => (
		<li key={post.id}>
			<Link to={`/post/${post.id}`}>{post.title}</Link>
		</li>
	));


	return (
		<>
			<h2>Post</h2>
			{renderedUserPost}
		</>
	);
}

export default UserPage;
