import { useState } from "react";

import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

function App() {
	return (
		<>
			<AddPostForm />
			<PostsList />
		</>
	);
}

export default App;
