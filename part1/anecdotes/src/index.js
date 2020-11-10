import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const RandomButton = ({setter, list}) => {
  const randomMaxN = (maxN) => () => {
    setter( (Math.floor( Math.random() * maxN )) )
  }
  return (
    <button onClick={ randomMaxN(list.length) }>Read!</button>
  )
}

const VoteButton = ({voteList, anecdoteIndex}) => {
  const incrementVote = () => () => {
    let copy = [...voteList.votes]
    copy[anecdoteIndex] += 1
    voteList.setVotes(copy)
  }
  return (
    <button onClick={incrementVote()}>Vote XD</button>
  )
}
const AnecdoteShow = ({anecdoteIndex, anecdoteList, voteList}) => {
  if(anecdoteIndex === -1){
    return (
      <div>
        <p>Click the button above to show an <b>anecdote!</b></p>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>{anecdoteList[anecdoteIndex]}</p>
        <p>
          <VoteButton voteList={voteList} anecdoteIndex={anecdoteIndex} />
          {" "}Vote count = {voteList.votes[anecdoteIndex]}
        </p>
      </div>
    )
  }
}

const AnecdoteFav = ({anecdoteList, votes}) => {
  const favAnecdoteIndex = () => (
    votes.indexOf(Math.max(...votes))
  )
  console.log("Max is... ", favAnecdoteIndex())
  return (
    <div>
      <p>The people's favourite Anecdote is:</p>
      <p>{anecdoteList[favAnecdoteIndex()]}</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(-1)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  return (
    <div>
      <RandomButton setter={setSelected} list={props.anecdotes} />
      <AnecdoteShow anecdoteIndex={selected} 
        anecdoteList={props.anecdotes} voteList={{votes, setVotes}} />
      <AnecdoteFav anecdoteList={props.anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)