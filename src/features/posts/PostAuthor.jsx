import React from "react";
import { useSelector } from "react-redux";

import { selectAllUsers } from "../users/usersSlice";

// Component to display the author of the posts
// Pass the userId from PostsList
function PostAuthor({ userId }) {
    // Get all users
	const users = useSelector(selectAllUsers);

    // Find the user that have the same id
	const author = users.find((user) => user.id === parseInt(userId));

	return (
		<>
			<span>
				<strong>by {author ? author.name : "Unkown author"}</strong>
			</span>
		</>
	);
}

export default PostAuthor;
