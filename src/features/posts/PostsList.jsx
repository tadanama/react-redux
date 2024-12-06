import React from "react";
import { useSelector } from "react-redux";

import { selectAllPosts } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import PostAuthor from "./PostAuthor";

function PostsList() {
	// Retrieve the state of the posts
	// Will return an array of posts because an array of posts is its initial state
	const posts = useSelector(selectAllPosts);

	// Map through all of the elements to display title, content and author
	const renderedPosts = posts.map((post) => (
		<article key={post.id}>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
            <PostAuthor userId={post.userId}/>
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
