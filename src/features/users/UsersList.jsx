import React from "react";
import { useSelector } from "react-redux";

import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

function UsersList() {
	const users = useSelector(selectAllUsers);

	const renderedUsers = users.map((user) => (
		<li key={user.id}>
			<Link to={`/user/${user.id}`}>{user.name}</Link>
		</li>
	));

	return (
		<>
			<h2>Users</h2>
            {renderedUsers}
		</>
	);
}

export default UsersList;
