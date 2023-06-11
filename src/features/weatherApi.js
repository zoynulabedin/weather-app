import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all users data
export const fetchWeatherData = createAsyncThunk(
	"weather/fetchWeatherData",
	async (location) => {
		const response = await axios.get(
			`http://api.weatherapi.com/v1/current.json?key=956cb11cf9834e72b1d54431230904&q=${location}&aqi=no`
		);
		return response.data;
	}
);
