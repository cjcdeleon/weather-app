// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require('cors');
const axios = require('axios');

dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.PORT || 3000;
const apiKey = process.env.APIKEY;

/*
const getCityData = async (req: Request) => {
    const { cityName } = req.params;
    const responseCity = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`);
    return responseCity.data;
}
 */

const getCityData = async (req: Request) => {
    const { cityName } = req.params;
    const responseCity = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`);
    const city = await responseCity.json();
    console.log(city)
    return city;
}

app.get("/weather/:cityName", async (req: Request, res: Response) => {
    try {
        const responseCity = await getCityData(req);
        const responseWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${responseCity[0].lat}&lon=${responseCity[0].lon}&&appid=${apiKey}`);
        res.status(200).send({
            city: responseCity,
            weather: responseWeather.data,
        });
    } catch (error) {
        console.error('Error occurred', error);
        res.status(500).send('An error occurred');
    }
});

app.get("/weather/history/:cityName", async (req: Request, res: Response) => {
    try {
        const responseCity = await getCityData(req);
        const responseWeatherHistory = await axios.get(`https://history.openweathermap.org/data/2.5/history/city=${responseCity[0].lat}&lon=${responseCity[0].lon}&type=hour&appid=${apiKey}`);
        res.status(200).send({
            city: responseCity,
            weather: responseWeatherHistory.data,
        });
    } catch (error) {
        console.error('Error occurred', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});