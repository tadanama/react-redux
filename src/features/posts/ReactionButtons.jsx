import React from "react";
import { useDispatch } from "react-redux";

import { addedReactions } from "./postsSlice";

const reactions = {
	likes: "👍🏼",
	dislikes: "👎🏼",
};

function ReactionButtons({ post }) {
	const dispatch = useDispatch();

	// Object entries will return array with the key and value as the element
	// If an object has two properties eg. person = {name: "Ahmad", age: 10 }
	// It will return an array with two elements and each element is another element with key and value from the object
	// [[name, "Ahmad"], [age, 10]]
	const reactionButtons = Object.entries(reactions).map(([name, emoji]) => {
		return (
			<button
				key={name}
				onClick={() =>
					dispatch(addedReactions({ postId: post.id, reaction: name }))
				}
			>
				{emoji} {post.reactions[name]}
			</button>
		);
	});
	return <>{reactionButtons}</>;
}

export default ReactionButtons;
