import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { updatedPost, selectPostbyId } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

function EditPostForm() {
	// Get the post id
	const { postId } = useParams();

	const navigate = useNavigate();

	// Get the specific post
	const post = useSelector((state) => selectPostbyId(state, Number(postId)));
	// Retrieve all users from the redux store
	const users = useSelector(selectAllUsers);

	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.body);
	const [userId, setUserId] = useState(post.userId);
	const [addRequestStatus, setAddRequestStatus] = useState("idle");

	const dispatch = useDispatch();

	// Display all of the user's name retrived from the redux store
	const userOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

	// Display error fi post not found
	if (!post) {
		return <h2>Post not found</h2>;
	}

	// Dsiable the button when one of the fields is not filled in
	const canUpdate =
		Boolean(title) &&
		Boolean(content) &&
		Boolean(userId) &&
		addRequestStatus === "idle";

	const handleCreatePostSubmit = (event) => {
		event.preventDefault();

		// Dispatch only when title, content and userId is not empty
		if (canUpdate) {
			// Dispatching actions to add new post synchronoulsy
			// dispatch(addedPost(title, content, userId));
			try {
				setAddRequestStatus("pending");

				// Dispatching actions to add new post asynchronoulsy
				// unwrap function throws an error if action is rejected
				dispatch(
					updatedPost({
						id: post.id,
						title,
						body: content,
						userId,
						reactions: post.reactions,
					})
				).unwrap();

				setTitle("");
				setContent("");
				setUserId("");
				// Redirect user to the SinglePostPage
				navigate(`/post/${post.id}`);
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
					defaultValue={userId}
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
				<button disabled={canUpdate ? false : true}>Update</button>
			</form>
		</>
	);
}

export default EditPostForm;
