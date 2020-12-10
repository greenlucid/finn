export const clearFilter = () => ({
  type: "CLEAR_FILTER"
})
export const changeFilter = (filter) => ({
  type: "CHANGE_FILTER",
  filter
})

const filterReducer = (state = "", action) => {
  switch(action.type) {
    case "CLEAR_FILTER":
      return ""
    case "CHANGE_FILTER":
      return action.filter
    default:
      return state
  }
}

export default filterReducer