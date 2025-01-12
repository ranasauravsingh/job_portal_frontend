import { createSlice, Slice } from "@reduxjs/toolkit";

const notificationSlice: Slice = createSlice({
	name: "notifications",
	initialState: {
		notificationChangeCount: 0,
	},
	reducers: {
		updateNotificationCount: (state, action) => {
			const { notificationCount = 0 } = action?.payload || {};
			return {
				...state,
				notificationChangeCount: notificationCount,
			};
		},
	},
});

export const { updateNotificationCount } = notificationSlice.actions;
export default notificationSlice.reducer;
