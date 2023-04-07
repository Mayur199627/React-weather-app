import { useEffect, useRef, useState } from 'react'
import './App.css'
import megnifier from './images/megnifier.svg'
import Mist from './images/mist.png'
import Clear from './images/clear.png'
import Thunderstorm from './images/thunder.png'
import Rain from './images/rain.png'
import Clouds from './images/cloudy.png'
import Snow from './images/snow.png'
import Smoke from './images/smoke.png'
import Haze from './images/haze.png'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [city, setCity] = useState('')
  const inputRef = useRef("indore")
  const [whetherImg, setWeatherImg] = useState("")

  useEffect(() => {
    const params = {
      appid: 'ce946b4bc58f5c8cac8f58f62a31ed59',
      q: inputRef.current.value === "" ? "indore" : inputRef.current.value,
      units: 'metric'
    }
    axios.get('https://api.openweathermap.org/data/2.5/weather', { params })
      .then(response => {
        return response.data
      })
      .then((res) => {
        setData({ ...res })
      })
      .catch(error => {
        console.log(error);
      });
    inputRef.current.value = ""
  }, [city])

  useEffect(() => {

    //Whether Images //

    if (data?.weather[0]?.main == "Thunderstorm") {
      setWeatherImg(Thunderstorm)
    }
    else if (data?.weather[0]?.main == "Clouds") {
      setWeatherImg(Clouds)
    }
    else if (data?.weather[0]?.main == "Rain") {
      setWeatherImg(Rain)
    }
    else if (data?.weather[0]?.main == "Clear") {
      setWeatherImg(Clear)
    }
    else if (data?.weather[0]?.main == "Snow") {
      setWeatherImg(Snow)
    }
    else if (data?.weather[0]?.main == "Mist") {
      setWeatherImg(Mist)
    }
    else if (data?.weather[0]?.main == "Smoke") {
      setWeatherImg(Smoke)
    }
    else if (data?.weather[0]?.main == "Haze") {
      setWeatherImg(Haze)
    }
  }, [data?.weather[0]?.main])


  // function for search //
  const handleSearch = () => {
    setCity(inputRef.current.value);
  }

  return (
    <div className='app-cont'>
      <h1>Forecast Weather</h1>
      <div className="details">
        <div className="input-cont">
          <input type="text" id="city-input" placeholder='Enter City Here...' ref={inputRef} spellCheck='false' />
          <img src={megnifier} alt="search" onClick={handleSearch} />
        </div>
        <div className="whether-img">
          <img src={whetherImg} alt="weather" height={100} width={100} />
        </div>
        <div className="temp">
          <h2>{Math.floor(data?.main?.temp)}<sup>o</sup>C</h2>
          <h2>{data?.weather[0]?.main}</h2>
          <h4>{data?.name} {data?.sys?.country}</h4>
        </div>
        <div className="other-dtl">
          <p><span>Humidity :</span><span>{Math.floor(data?.main?.humidity)}%</span></p>
          <p><span>Pressure :</span> <span>{Math.floor(data?.main?.pressure / 100)} Pa</span></p>
          <p><span>Visibility :</span> <span>{Math.floor(data?.visibility) / 1000} KM</span></p>
          <p><span>Wind Speed :</span> <span>{Math.floor(data?.wind?.speed)} Km/h</span></p>
        </div>
      </div>
    </div>
  )
}

export default App
