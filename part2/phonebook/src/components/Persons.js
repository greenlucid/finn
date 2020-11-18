import personService from '../services/phonebook'

const Person = ({person, setPersons, setErrorMessage}) => {

  const deleteHandler = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
        .then(response => {
          personService.getAll()
            .then(response => setPersons(response))
        })
    }
  }

  return (
    <li key={person.id}>
      {person.name} {person.number}
      {' '} <button onClick={deleteHandler(person)}>delete</button>
    </li>
  )
}

const Persons = ({persons, setPersons, setErrorMessage}) => (
  <ul>
    {persons.map(person => 
      <Person person={person} setPersons={setPersons} setErrorMessage={setErrorMessage}
        key={person.id}/>)}
  </ul>
)

export default Persons