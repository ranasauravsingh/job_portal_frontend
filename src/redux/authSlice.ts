import { createSlice, Slice } from "@reduxjs/toolkit";

const authSlice: Slice = createSlice({
	name: "auth",
	initialState: {
		loading: false,
		user: null,
	},
	reducers: {
		// actions
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});
export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
