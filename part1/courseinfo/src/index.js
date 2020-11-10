import React from 'react'
import ReactDOM from 'react-dom'

//Header is name of the course
const Header = (props) => (
  <div>
    <h1>{props.name}</h1>
  </div>
)
//Content renders name of part and n of exercises
const Content = (props) =>  {
  return(
  <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
  </div>
)}
//Part renders name of part and n of exercises
const Part = (props) => (
  <div>
    <p>
      {props.part.name} with {props.part.exercises} exercises.
    </p>
  </div>
)
//Total renders total number of exercises
const Total = (props) => {
  let sum = 0
  props.parts.forEach(i => sum += i.exercises)
  return(
  <div>
    <p>
      Total number of exercises: {sum}
    </p>
  </div>
)}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

