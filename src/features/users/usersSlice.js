import { createSlice } from "@reduxjs/toolkit";

// Declaring users initial state
const initialState = [
	{ id: 1, name: "Syakir" },
	{ id: 2, name: "Haziq" },
	{ id: 3, name: "Tadanama" },
];

// Defining users slice
const usersSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
});

// Exporting users action creators
export const {} = usersSlice.actions;

// Exporting user slice reducer
export default usersSlice.reducer;

// Select all users in the redux store
export const selectAllUsers = (state) => state.user;
