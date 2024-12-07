import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Declaring users initial state
const initialState = [];

const USER_URL = "https://jsonplaceholder.typicode.com/users"

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
	try {
		const result = await axios.get(USER_URL);

		// Return the data (an array of user objects) below as the payload to the reducer
		return result.data;
	} catch (error) {
		console.log(error);
		return error.message;
	}
})

// Defining users slice
const usersSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.pending, (state) => {
			console.log("fetching users")
		})
		.addCase(fetchUsers.fulfilled, (state, action) => {
			// Spread the action payload and push to the state
			state.push(...action.payload);

			// Overwrite the state completely with the action payload
			// return action.payload;
		})
	}
});

// Exporting users action creators
export const {} = usersSlice.actions;

// Exporting user slice reducer
export default usersSlice.reducer;

// Select all users in the redux store
export const selectAllUsers = (state) => state.user;
