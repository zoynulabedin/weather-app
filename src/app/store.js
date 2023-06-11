import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
const store = configureStore({
	reducer: {
		data: weatherReducer,
	},
});

export default store;
