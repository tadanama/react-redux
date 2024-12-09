import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<>
			<div className="header">
				<h1>Redux Blog</h1>
				<nav>
					<ul>
						<Link to={"/"}>
							<li>Home</li>
						</Link>
						<Link to={"post"}>
							<li>Post</li>
						</Link>
						<Link to={"user"}>
							<li>Users</li>
						</Link>
					</ul>
				</nav>
			</div>
		</>
	);
}

export default Header;
