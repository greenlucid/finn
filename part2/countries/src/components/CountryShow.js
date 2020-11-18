import React, {useState, useEffect} from 'react'
import axios from "axios"

const CountryNameList = ({countries, setSearchName}) => (
  <ul>
    {countries.map(country => 
      <CountryNameListElement 
        key={country.name} country={country} setSearchName={setSearchName}/>
    )}
  </ul>
)

const CountryNameListElement = ({country, setSearchName}) => (
  <li key={country.name}>
    {country.name}
    {' '}
    <button onClick={() => setSearchName(country.name)}>
      view
    </button>
  </li>
)

const CountryView = ({country}) => (
  <div>
    <h2>{country.name}</h2>
    Capital: {country.capital}
    <br></br> Population: {country.population}
    <h3>Languages</h3>
    <ul>
      {country.languages.map(language => (
        <li key={language.name}>{language.name}</li>
      ))}
    </ul>
    <img src={country.flag} alt={`Flag of ${country.name}`}/>
    <CapitalWeather country={country} />
  </div>
)

const CapitalWeather = ({country}) => {
  const [weatherData, setWeatherData] = useState(null)
  const weatherLink = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=`

  useEffect(() => {
    axios
      .get(weatherLink + country.capital)
      .then(response => {
        setWeatherData(response.data)
      })
    }, [])

  if(weatherData){
    return(
      <div>
        <h3>Weather in {country.capital}</h3> <br></br>
        <b>Time: </b> {weatherData.location.localtime.slice(-5)} <br></br>
        <b>Temperature: </b> {weatherData.current.temperature} {' °C'} <br></br>
        <b>Wind: </b> {weatherData.current.wind_speed} {' km/h '} {weatherData.current.wind_dir} <br></br>
        <img src={weatherData.current.weather_icons[0]} alt='Weather Icon' />
      </div>
    )
  } else {
    return(<div></div>)
  }
}

const CountryShow = ({countries, searchName, setSearchName}) => {
  const filteredCountries = () => (
    searchName === ''
    ? countries
    : countries.filter( 
        country => country.name.toLowerCase().includes(searchName.toLowerCase())
      )
  )

  if(filteredCountries().length === 0) {
    return <h2>Country Not Found</h2>
  } else if(filteredCountries().length > 10) {
    return <h2>Too many matches</h2>
  } else if(filteredCountries().length === 1) {
    return <CountryView country={filteredCountries()[0]} />
  } else {
    return <CountryNameList countries={filteredCountries()} setSearchName={setSearchName} />
  }
}

export default CountryShow