import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import {changeFilter} from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const filter = useSelector(state => state.filter)
  const dispatcher = useDispatch()

  return (
    <div>
      <input
        onChange={(e) => dispatcher(changeFilter(e.target.value))}
        value={filter}
      />
    </div>
  )
}

export default AnecdoteFilter