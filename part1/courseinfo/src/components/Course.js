import React from 'react'

//Header is name of the course
//Here I took ~30min to notice I put (name) instead of ({name})
//React is merciless
const Header = ({name}) => {
  console.log("Header name is: ", name);
  return (
  <div>
    <h1>{name}</h1>
  </div>
)}
//Content renders name of part and n of exercises
const Parts = ({parts}) =>  {
  console.log("Parts are ", parts);
  return(
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part}/>)}
    </div>
  )
}
//Part renders name of part and n of exercises
const Part = ({part}) => {
  console.log("This is part ", part.id, ": ", part);
  return (
  <div>
    <p>
      {part.name} - {part.exercises} exercises.
    </p>
  </div>
)}

// Total renders total number of exercises
// I thought about two ways to use reduce():
// 1st is parts.map(p => p.ex).reduce((a, b) => a + b)
// I feel it's missing the point on learning how to reduce
// 2nd is returning an object with ex field
// parts.reduce((acc, p) => ({ex: acc.ex + p.ex })).ex
// I feel this is too ugly and kinda cheating
// I can't wait to see the "proper solution" but I got to submit
// So I go with 1st!

const Total = ({parts}) => {
  const sum = parts.map( p => p.exercises )
    .reduce( (a, b) => a + b )
  console.log("We finally render total");
  return(
  <div>
    <p>
      <b>
        Total number of exercises: {sum}
      </b>
    </p>
  </div>
)}

const Course = ({course}) => {

  return (
    <div>
      <Header name={course.name} />
      <Parts parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course