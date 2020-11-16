import React, { useState } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import NameFilter from './NameFilter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Willy Wonka', number: '39-23-6423122', id: 3 }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const handleNameChange = (event) => (
    setNewName(event.target.value)
  )

  const handleNumberChange = (event) => (
    setNewNumber(event.target.value)
  )
  
  const handleNameFilterChange = (event) => (
    setNameFilter(event.target.value)
  )

  const addPerson = (event) => {
    event.preventDefault()
    if( persons.map(person => person.name).includes(newName) ){
      window.alert(`${newName} is already in the Phonebook`)
    } else {
      const newPerson = {
        id: persons.length,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = nameFilter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <NameFilter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <h2>Add new entry</h2>

      <PersonForm newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
        addPerson={addPerson} 
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App