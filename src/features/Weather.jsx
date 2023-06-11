"use client"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import weatherbg from "../assets/nikolay-vorobyev-lYC4vag0y7M-unsplash.jpg";
import "./weather.scss";
import { fetchWeatherData } from "./weatherApi";
import { getWeatherData } from "./weatherSlice";
export default function Weather() {
  const [city, setCity] = useState('Pabna');

//   const [loadings, setLoadings] = useState(true);
  const inputHandleChange =(e) => {
    setCity(e.target.value);
  }
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




 const style = {
		backgroundImage: `url(${weatherbg})`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		// additional CSS properties for the background
 };
    
  return (
		<>
			<div className="body-wrapper" style={style}>
				<div className="container">
					<div className="location-form">
						<form onSubmit={formSumbitHandler}>
							<input
								type="text"
								placeholder="Enter location..."
								value={city}
								name="city"
								onChange={inputHandleChange}
							/>
							<button type="submit">Search</button>
						</form>
					</div>
					{data == {} && loading ? (
						<div>Loading...</div>
					) : (
						<div className="wrapper">
							<div className="header">
								<div className="left">
									<h1>
										{data?.location.country},<span>{data?.location.name}</span>
									</h1>
									<h2>
										{data?.location.localtime}
										<br />
										{data?.location.tz_id}
									</h2>
								</div>
								<div className="right">
									<h1>Cloud:{data?.current.cloud} </h1>
									<img src={data?.current.condition.icon} alt="" />
									<h2>{data?.current.condition.text}</h2>
								</div>
							</div>
							<div className="body-wrapp">
								<ul>
									<li>Feel C : {data?.current.feelslike_c}</li>
									<li>Feel F : {data?.current.feelslike_f}</li>
									<li>Gust KPH : {data?.current.gust_kph}</li>
									<li>Gust MPH : {data?.current.gust_mph}</li>
									<li>Humidity : {data?.current.humidity}</li>
								</ul>
								<ul>
									<li>Temp C:{data?.current.temp_c}</li>
									<li>Temp F:{data?.current.temp_f}</li>
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
