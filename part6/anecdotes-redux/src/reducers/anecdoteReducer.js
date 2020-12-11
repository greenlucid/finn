import anecdoteService from '../services/anecdotes'

const getId = () => (10000000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case "INIT_ANECDOTES":
      return action.data
    case "DELETE_ALL_ANECDOTES":
      return []
    case "CREATE_ANECDOTE":
      return [...state, action.data]
    case "VOTE_ANECDOTE":
      return state.map(anecdote => (
        anecdote.id === action.data.id
          ? {...anecdote, votes : anecdote.votes + 1}
          : anecdote
      ))
    default:
      return state
  }
}

export const initAnecdotes = () => (
  async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
)

export const createAnecdote = (anecdote) => (
  async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    })
  }
)

export const voteAnecdote = (anecdote) => (
  async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: votedAnecdote
    })
  }
)

export default anecdoteReducer