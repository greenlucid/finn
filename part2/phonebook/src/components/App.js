import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import NameFilter from './NameFilter'
import personService from '../services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    console.log('effect');
    personService.getAll()
      .then(response => setPersons(response))
  }, [])

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
      if(window.confirm(`${newName} is already in the Phonebook, replace the number?`)){
        const oldPerson = persons.find(person => person.name === newName)
        const changedPerson = {...oldPerson, number: newNumber}
        personService.update(changedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : response))
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService.create(newPerson)
        .then(response => setPersons(persons.concat(newPerson)))
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
      <Persons persons={personsToShow} setPersons={setPersons}/>
    </div>
  )
}

export default App