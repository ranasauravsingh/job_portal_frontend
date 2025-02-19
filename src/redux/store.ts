import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	// persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import notificationSlice from "./notificationSlice";
// import applicationSlice from "./applicationSlice";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	auth: authSlice,
	job: jobSlice,
	company: companySlice,
	notifications: notificationSlice,
	// application:applicationSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

// const store = configureStore({
// 	reducer: {
// 		auth: authSlice,
// 		job: jobSlice,
// 	},
// });

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
