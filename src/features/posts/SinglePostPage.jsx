import React from "react";
import { selectPostbyId } from "./postsSlice";
import { useSelector } from "react-redux";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams } from "react-router-dom";

function SinglePostPage() {
	// Retrieve specific postId using useParams
	const { postId } = useParams();

	const post = useSelector((state) => selectPostbyId(state, Number(postId)));

	// If no post found render heading below
	if (!post) {
		return <h2>Post not found</h2>;
	}

	return (
		<article>
			<h2>{post.title}</h2>
			<p>{post.body}</p>
			<PostAuthor userId={post.userId} />
			<TimeAgo timestamp={post.date} />
			<ReactionButtons post={post} />
		</article>
	);
}

export default SinglePostPage;
