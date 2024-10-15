import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:3000/weather'
        }),
    endpoints: (builder) => ({
        getWeatherByCity: builder.query<any, string>({
            query: (cityName) => `/${cityName}`,
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetWeatherByCityQuery } = weatherApi