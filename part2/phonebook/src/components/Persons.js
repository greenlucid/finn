import personService from '../services/phonebook'

const Person = ({person, setPersons}) => {

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

const Persons = ({persons, setPersons}) => (
  <ul>
    {persons.map(person => 
      <Person person={person} setPersons={setPersons} key={person.id}/>)}
  </ul>
)

export default Persons