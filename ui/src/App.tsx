import { useLazyGetWeatherByCityQuery, useLazyGetWeatherHistoryByCityQuery } from "./app/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectCity, updateCity } from "./app/appSlice"
import JsonView from "@uiw/react-json-view"
import {vscodeTheme} from "@uiw/react-json-view/vscode";

const App = () => {
  const city = useSelector(selectCity)
  const [getWeatherByCity, result] = useLazyGetWeatherByCityQuery()
  const [getWeatherHistoryByCity, resultHistory] = useLazyGetWeatherHistoryByCityQuery()
  const dispatch = useDispatch()
  return (
    <div className="App">
      <div>
        City
        <input type="text"
               value={city}
               onChange={(v) => dispatch(updateCity(v.target.value))}
        />
        <button onClick={() => getWeatherByCity(city)}>Get Current</button>
        <button onClick={() => getWeatherHistoryByCity(city)}>Get History</button>
      </div>
      <br />
      {result?.data?.city &&
        (<div>
        <JsonView value={result?.data?.city} style={vscodeTheme} />
        </div>)
      }
      <br />
      {result?.data?.weather &&
        (<div>
          <JsonView value={result?.data?.weather} style={vscodeTheme} />
        </div>)
      }
    </div>
  )
}

export default App
