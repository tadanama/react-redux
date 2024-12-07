import React from "react";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

function PostsExcerpt({ post }) {
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

export default PostsExcerpt;
