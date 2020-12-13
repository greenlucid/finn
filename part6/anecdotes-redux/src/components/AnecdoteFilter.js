import React from 'react'
import { connect } from "react-redux"
import { changeFilter } from '../reducers/filterReducer'

const AnecdoteFilter = ({filter, changeFilter}) => {
  return (
    <div>
      <input
        onChange={(e) => changeFilter(e.target.value)}
        value={filter}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  filter: state.filter
})

const mapDispatchToProps = {
  changeFilter
}

const ConnectedAnecdoteFilter = connect(mapStateToProps, mapDispatchToProps)(AnecdoteFilter)

export default ConnectedAnecdoteFilter