import { useState } from "react";
import Counter from "./features/counter/Counter.jsx";
import Posts from "./features/post/Posts.jsx";

function App() {
	return (
		<>
			<Counter />
			<Posts />
		</>
	);
}

export default App;
