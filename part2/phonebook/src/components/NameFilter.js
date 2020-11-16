const NameFilter = ({nameFilter, handleNameFilterChange}) => (
  <div>
    Filter the list below <input value={nameFilter} onChange={handleNameFilterChange}/>
  </div>
)

export default NameFilter