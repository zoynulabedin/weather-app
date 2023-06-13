import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import weatherbg from "../../public/cloud-blue-sky.jpg";
import nightbg from "../../public/night.jpg";
import './Weather.scss';
import { fetchWeatherData } from "./weatherApi";
import { getWeatherData } from "./weatherSlice";
function Weather() {
      const [city, setCity] = useState('Dhaka');

			//   const [loadings, setLoadings] = useState(true);
			const inputHandleChange = (e) => {
				setCity(e.target.value);
			};
			const dispatch = useDispatch();
			const { data, loading } = useSelector(getWeatherData);
			console.log(data);
			useEffect(() => {
				dispatch(fetchWeatherData(city));
				console.log(city);
			}, [dispatch]);

			const formSumbitHandler = (e) => {
				e.preventDefault();

				dispatch(fetchWeatherData(city));
			};
		const isDaytime = data?.current.is_day === 1;
	
	const bg = isDaytime ? weatherbg : nightbg;
     const style = {
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				// additional CSS properties for the background
			};
	
	
            
  return (
		<div
			className="weather-body-wrapper mx-auto overflow-hidden"
			style={style}>
			<div className="container w-6/12 mx-auto mt-28">
				<div className="location-form text-center">
					<form onSubmit={formSumbitHandler}>
						<input
							type="text"
							placeholder="Enter location..."
							value={city}
							name="city"
							className="md:w-7/12 sm:w-full border-0 focus:outline-none p-2 rounded"
							onChange={inputHandleChange}
						/>
						<button
							className="md:mt-0 mt-5 border border-white p-1 ml-5 text-white h-9 w-20 hover:bg-slate-600 hover:border-slate-600 hover:cursor-pointer"
							type="submit">
							Search
						</button>
					</form>
				</div>
				{loading ? (
					<div className="absolute w-full h-screen top-0 left-0 bottom-0 right-0 text-center mx-auto bg-slate-950">
						<h1 className="text-white text-3xl mt-96">Loading...</h1>
					</div>
				) : (
					<div className="wrapper mx-auto">
						<div className="header md:flex justify-between block text-center mx-auto mt-16">
							<div className="left text-white">
								<h1>
									{data?.location.country},<span>{data?.location.name}</span>
								</h1>
								<h2>
									{data?.location.localtime}
									<br />
									{data?.location.tz_id}
								</h2>
							</div>
							<div className="box text-white text-left">
								<img
									className="block text-right w-20"
									src={data?.current.condition.icon}
									alt=""
								/>
								<h1>Cloud:{data?.current.cloud} </h1>

								<h2>{data?.current.condition.text}</h2>
							</div>
						</div>
						<div className="body-wrapp mx-auto text-center mt-36">
							<ul className="flex gap-10 text-white">
								<li className="border border-sky-100 p-3 rounded shadow-sm shadow-white">
									Feel C : {data?.current.feelslike_c}
								</li>
								<li className="border border-sky-100 p-3 rounded shadow-sm shadow-white">
									Feel F : {data?.current.feelslike_f}
								</li>
								<li className="border border-sky-100 p-3 rounded shadow-sm shadow-white">
									Gust KPH : {data?.current.gust_kph}
								</li>
								<li className="border border-sky-100 p-3 rounded shadow-sm shadow-white">
									Gust MPH : {data?.current.gust_mph}
								</li>
								<li className="border border-sky-100 p-3 rounded shadow-sm shadow-white">
									Humidity : {data?.current.humidity}
								</li>
								<li className="border border-sky-100 p-3 rounded shadow-sm shadow-white">
									Temp C:{data?.current.temp_c}
								</li>
								<li className="border border-sky-100 p-3 rounded shadow-sm shadow-white">
									Temp F:{data?.current.temp_f}
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Weather