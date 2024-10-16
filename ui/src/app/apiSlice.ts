import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery(
        {
            // baseUrl: 'http://localhost:3000/weather'
            // baseUrl: 'https://yjoy36bqti.execute-api.ap-southeast-2.amazonaws.com/weather'
            baseUrl: 'https://iax43go7ne.execute-api.ap-southeast-2.amazonaws.com/weather'
        }),
    endpoints: (builder) => ({
        getWeatherByCity: builder.query<any, string>({
            query: (cityName) => `/${cityName}`,
        }),
        getWeatherHistoryByCity: builder.query<any, string>({
            query: (cityName) => `/history/${cityName}`,
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetWeatherByCityQuery, useLazyGetWeatherHistoryByCityQuery } = weatherApi