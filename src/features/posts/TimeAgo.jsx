import React from "react";
import { formatDistanceToNow } from "date-fns";

function TimeAgo({ timestamp }) {
	return (
		<>
			<span> Posted {formatDistanceToNow(timestamp)} ago </span>
		</>
	);
}

export default TimeAgo;
