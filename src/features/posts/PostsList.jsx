import React from "react";
import { useSelector } from "react-redux";

import { selectAllPosts } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

function PostsList() {
	// Retrieve the state of the posts
	// Will return an array of posts because an array of posts is its initial state
	const posts = useSelector(selectAllPosts);

	// Sort the post
	// Recent post should go to the top
	const orderedPosts = posts
		.slice()
		.sort((a, b) => b.date.localeCompare(a.date));

	// Map through all of the elements to display title, content and author
	const renderedPosts = orderedPosts.map((post) => (
		<article key={post.id}>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
			<PostAuthor userId={post.userId} />
			<TimeAgo timestamp={post.date} />
		</article>
	));
	return (
		<>
			<h1>Posts</h1>
			{renderedPosts}
		</>
	);
}

export default PostsList;