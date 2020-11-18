const SearchBar = ({name, setName}) => {

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  return(
    <div>
      find countries by typing in the box
      <br></br><input value={name} onChange={handleNameChange} />
    </div>
  )
}

export default SearchBar