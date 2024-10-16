/* global fetch */
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "weather-manual-create";

const apiKey = 'abe0f464ba654ea41c352c248aab9e9e';



const getCityData = async (event) => {
  const { cityName } = event.pathParameters;
  const responseCity = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`);
  const city = await responseCity.json();
  // console.log(city)
  return city;
}

const getWeatherData = async (city) => {
  const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city[0].lat}&lon=${city[0].lon}&&appid=${apiKey}`);
  const weather = await responseWeather.json();
  // console.log(city)
  return weather;
}

const saveToDB = async (id, event, resp) => {
  await dynamo.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        id,
        request: event,
        response: resp,
      },
    })
  );
}

export const handler = async (event, context) => {
  try {
    // console.log('event', event)
    const city = await getCityData(event);
    const weather = await getWeatherData(city);
    // console.log(weather)

    const resp =  {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        // city,
        weather,
      }),
    };

    await saveToDB(context.awsRequestId, event, resp);
    return resp;
  } catch (error) {
    console.error('Error occurred', error);
    const resp = {
      statusCode: 500,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({data: 'An error occurred'}),
    };

    await saveToDB(context.awsRequestId, event, resp);
    return resp;
  }
};