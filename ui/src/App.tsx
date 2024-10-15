import "./App.css"
import {useGetWeatherByCityQuery} from "./app/apiSlice";
import { useDispatch, useSelector } from "react-redux"
import { selectCity, updateCity } from "./app/appSlice"

const App = () => {
  const city = useSelector(selectCity)
  const {data} = useGetWeatherByCityQuery(city)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <div>
        City
        <input type="text"
               value={city}
               onChange={(v) => dispatch(updateCity(v.target.value))}
        />
      </div>
      <div>
        {city}-{JSON.stringify(data)}
      </div>
    </div>
  )
}

export default App
