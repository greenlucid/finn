const Person = ({person}) => (
  <li>
    {person.name} {person.number}
  </li>
)

const Persons = ({persons}) => (
  <ul>
    {persons.map(person => 
      <Person person={person} key={person.id} />)}
  </ul>
)

export default Persons