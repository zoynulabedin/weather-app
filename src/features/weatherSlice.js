import { createSlice } from "@reduxjs/toolkit";
import { fetchWeatherData } from "./weatherApi";

export const weatherSlice = createSlice({
	name: "weather",
	initialState: {
		data: null,
		loading: false,
		message: null,
		error: null,
	},
	reducers: [],
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeatherData.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchWeatherData.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.data = payload;
			})
			.addCase(fetchWeatherData.rejected, (state, { payload }) => {
				state.loading = false;
				state.message = payload;
			});
	},
});
export const getWeatherData = (state) => state.data;

// export const {} = weatherSlice.actions;
export default weatherSlice.reducer;
