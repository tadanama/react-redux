import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addedPost, addedAsyncPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

function AddPostForm() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");
	const [addRequestStatus, setAddRequestStatus] = useState("idle");

	const dispatch = useDispatch();

	// Retrieve all users from the redux store
	const users = useSelector(selectAllUsers);

	const userOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

	// Dsiable the button when one of the fields is not filled in
	const canCreate =
		Boolean(title) &&
		Boolean(content) &&
		Boolean(userId) &&
		addRequestStatus === "idle";

	const handleCreatePostSubmit = (event) => {
		event.preventDefault();

		// Dispatch only when title, content and userId is not empty
		if (canCreate) {
			// Dispatching actions to add new post synchronoulsy
			// dispatch(addedPost(title, content, userId));
			try {
				setAddRequestStatus("pending");

				// Dispatching actions to add new post asynchronoulsy
				// wrap function throws an error if action is rejected
				dispatch(addedAsyncPost({ title, body: content, userId })).wrap();

				setTitle("");
				setContent("");
				setUserId("");
			} catch (error) {
				console.log(error);
			} finally {
				setAddRequestStatus("idle");
			}
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
