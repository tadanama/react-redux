import React from "react";
import { useSelector } from "react-redux";

import { selectAllUsers } from "./usersSlice";

function UsersList() {
	const users = useSelector(selectAllUsers);

	return (
		<>
			<ol>
				{users.map((user) => (
					<li>{user.name}</li>
				))}
			</ol>
		</>
	);
}

export default UsersList;
