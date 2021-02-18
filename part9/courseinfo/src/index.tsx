import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescribed extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescribed {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescribed {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CourseSpecial extends CoursePartDescribed {
  name: "Secret course";
  secretRecipe: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CourseSpecial;

const Header: React.FC<{ header: string }> = (props) => {
  return (
    <h1>{props.header}</h1>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart, key: number }> = ({ part, key }) => {
  switch (part.name) {
    case ("Fundamentals"):
      return (
        <div key={key}>
          <p>{part.name} {part.exerciseCount} {part.description}</p>
        </div>
      );
    case ("Using props to pass data"):
      return (
        <div key={key}>
          <p>{part.name} {part.exerciseCount}, and there are {part.groupProjectCount} project groups</p>
        </div>
      );
    case ("Deeper type usage"):
      return (
        <div key={key}>
          <p>{part.name} {part.exerciseCount} {part.description} <a href={part.exerciseSubmissionLink}>Submit</a></p>
        </div>
      );
    case ("Secret course"):
      return (
        <div key={key}>
          <p>{part.name} {part.exerciseCount} {part.description} Secret recipe is: {part.secretRecipe}</p>
        </div>
      )
    default:
      return assertNever(part);
  }
};

const Content: React.FC<{ parts: CoursePart[] }> = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part part={part} key={index}/>
      ))}
    </div>
  );
};

const Total: React.FC<{ parts: CoursePart[] }> = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.parts.reduce((acc, item) => acc + item.exerciseCount, 0)}
      </p>
    </div>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Secret course",
      exerciseCount: 1,
      description: "No one knows this course",
      secretRecipe: "Three parts sulfur, one part alcohol"
    }
  ];

  return (
    <div>
      <Header header={courseName}/>
      <Content parts={courseParts}/>
      <Total parts={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));