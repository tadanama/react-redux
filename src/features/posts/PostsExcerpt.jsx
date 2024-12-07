import React from "react";
import { Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

function PostsExcerpt({ post }) {
	return (
		<article>
			<h2>{post.title}</h2>
			<p>{post.body.substring(0, 75)}...</p>
			<Link to={`post/${post.id}`}>View post </Link>
			<PostAuthor userId={post.userId} />
			<TimeAgo timestamp={post.date} />
			<ReactionButtons post={post} />
		</article>
	);
}

export default PostsExcerpt;
