import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({name, count, setter}) => {
  const increment = (count, setter) => () => ( setter(count + 1) )
  return (
    <button onClick={increment(count, setter)}>{name}</button> 
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(!( good || neutral || bad )){
    return(
      <div>
        <p>No feedback gathered yet!</p>
      </div>
    )
  }
  else {
    const average = (good - bad) / (good + neutral + bad)
    const positivePercent = good / (good + neutral + bad) * 100
    return(
      <div>
        <h2>Statistics:</h2>
        <table>
          <Statistic name="👌" value={good} />
          <Statistic name="👀" value={neutral} />
          <Statistic name="🔥" value={bad} />
          <Statistic name="Average" value={average} />
          <Statistic name="Positive rate" value={positivePercent + "%"} />
        </table>
      </div>
    )
  }
}

const Statistic = ({name, value}) => (
  <tbody>
    <tr>
      <td><b>{name}</b></td>
      <td>{value}</td>
    </tr>
  </tbody>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>Welcome to Unicafe</h1>
      <p>Did you like the service? Please don't be too honest
        or I will be sent to the gulag.
      </p>
      <p>
        <Button name="good" count={good} setter={setGood} />
        <Button name="neutral" count={neutral} setter={setNeutral} />
        <Button name="bad" count={bad} setter={setBad} />
      </p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)