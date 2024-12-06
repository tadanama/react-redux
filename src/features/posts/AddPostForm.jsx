import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addedPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

function AddPostForm() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");

	const dispatch = useDispatch();

	// Retrieve all users from the redux store
	const users = useSelector(selectAllUsers);

	const userOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

	// Dsiable the button when one of the fields is not filled in
	const canCreate = Boolean(title) && Boolean(content) && Boolean(userId);

	const handleCreatePostSubmit = (event) => {
		event.preventDefault();

		// Dispatch only when title, content and userId is not empty
		if (canCreate) {
			dispatch(addedPost(title, content, userId));

			setTitle("");
			setContent("");
			setUserId("");
		}
	};

	return (
		<>
			<form onSubmit={handleCreatePostSubmit}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					onChange={(event) => setTitle(event.target.value)}
					value={title}
				/>
				<br />
				<label htmlFor="user">Author</label>
				<select
					name="user"
					id="user"
					value={userId}
					onChange={(event) => setUserId(event.target.value)}
				>
					<option value=""></option>
					{userOptions}
				</select>
				<br />
				<label htmlFor="content">Content</label>
				<input
					type="text"
					id="content"
					value={content}
					onChange={(event) => setContent(event.target.value)}
				/>
				<br />
				{/* Disable button if all field is not filled in */}
				<button disabled={canCreate ? false : true}>Create</button>
			</form>
		</>
	);
}

export default AddPostForm;
