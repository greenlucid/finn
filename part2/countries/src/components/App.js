import React, {useState, useEffect} from 'react';
import axios from 'axios'

import SearchBar from './SearchBar'
import CountryShow from './CountryShow'

const App = () => {
  const [countryData, setCountryData] = useState([])
  
  const [searchName, setSearchName] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response => {
        setCountryData(response.data)
      })
  }, [])

  return (
    <div>
      <SearchBar name={searchName} setName={setSearchName} />
      <CountryShow countries={countryData} searchName={searchName} setSearchName={setSearchName} 
        />
    </div>
  )
}

export default App