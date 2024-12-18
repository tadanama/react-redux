import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	selectAllPosts,
	getPostError,
	getPostStatus,
	fetchposts,
	selectPostIds,
} from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import PostsExcerpt from "./PostsExcerpt";

function PostsList() {
	// Retrieve the state of the posts
	// Will return an array of posts because an array of posts is its initial state
	//* const posts = useSelector(selectAllPosts);

	//? Post id is already sorted in the createEntityAdapter
	const orderedPostIds = useSelector(selectPostIds);

	// Get the status when fetching posts from redux store
	const postsStatus = useSelector(getPostStatus);

	// Get the error when fetching posts from redux store
	const postsError = useSelector(getPostError);

	// const dispatch = useDispatch();

	// Run useEffect on first render and if postStatus changes
	// dispatch is provided as the dependency to avoid eslint warnings
	// Fetch posts if status is idle
	//? No need to fetch the post again because it it already fetched before the App component is rendered
	// useEffect(() => {
	// 	if (postsStatus === "idle") {
	// 		dispatch(fetchposts());
	// 	}
	// }, [postsStatus, dispatch]);

	// Display differnt content depending on posts status
	let content;

	if (postsStatus === "pending") {
		content = <h2>Loading...</h2>;
	} else if (postsStatus === "succeeded") {

		// Sort the post
		// Recent post should go to the top
		//* const orderedPosts = posts
		//* 	.slice()
		//* 	.sort((a, b) => b.date.localeCompare(a.date));

		// Remove duplicate posts
		// Refer to the comment section on Dave Gray's redux video for more info
		//* const preContent = orderedPostIds.filter((post, index) => {
		//* 	if (index !== orderedPostIds.length - 1) {
		//* 		return post.id !== orderedPostIds[index + 1].id;
		//* 	}
		//* 	return post;
		//* });

		// Map through all of the elements to display title, content, author, how long ago it was posted and the like and dislike button from post excerpt
		//* content = preContent.map((postId) => (
		//* 	<PostsExcerpt key={postId} postId ={postId} />
		//* ));

		content = orderedPostIds.map(postId => (
			<PostsExcerpt key={postId} postId={postId} />
		))
	} else if (postsStatus === "failed") {
		content = <p>{postsError}</p>;
	}

	return <>{content}</>;
}

export default PostsList;
