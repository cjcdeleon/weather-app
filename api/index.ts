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

app.get("/", async (req: Request, res: Response) => {
    try {
        const { cityName } = req.query;
        const responseCity = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`);
        const city = responseCity.data;
        const responseWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city[0].lat}&lon=${city[0].lon}&&appid=${apiKey}`);
        res.status(200).send({
            city: city,
            weather: responseWeather.data,
        });
    } catch (error) {
        console.error('Error occurred', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});