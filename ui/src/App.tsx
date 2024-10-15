import { useLazyGetWeatherByCityQuery } from "./app/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectCity, updateCity } from "./app/appSlice"

const App = () => {
  const city = useSelector(selectCity)
  const  [getWeatherByCity, result]  = useLazyGetWeatherByCityQuery()
  const dispatch = useDispatch()
  return (
    <div className="App">
      <div>
        City
        <input type="text"
               value={city}
               onChange={(v) => dispatch(updateCity(v.target.value))}
        />
        <button onClick={() => getWeatherByCity(city)}>Get weather</button>
      </div>
      <div>
        {city}-{JSON.stringify(result)}
      </div>
    </div>
  )
}

export default App
