import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import NameFilter from './NameFilter'
import personService from '../services/phonebook'
import Messager from './Messager'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const [ errorMessage, setErrorMessage ] = useState(null)

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
            setErrorMessage({type: 'notice', text: `${newName} was updated`})
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error)
            setErrorMessage({type: 'error', text: `${changedPerson.name} was already deleted`})
          })
      }
    } else {
        const newPerson = {
          name: newName,
          number: newNumber
        }
        personService.create(newPerson)
          .then(response => {
            setPersons(persons.concat(newPerson))
            setErrorMessage({type: 'notice', text: `${response.name} was created`})
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
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
      <Messager errorMessage={errorMessage} />
      <h2>Add new entry</h2>
      <PersonForm newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
        addPerson={addPerson} 
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default App