const Messager = ({errorMessage}) => {

  const styleError = {
    color: 'red',
    borderStyle: 'solid',
    borderWidth: 10,
    borderColor: 'red',
    background: 'black',
    fontWeight: 'bold'
  }

  const styleNotice = {
    color: 'green',
    borderStyle: 'solid',
    borderWidth: 10,
    borderColor: 'green',
    background: 'white',
    fontWeight: 'bold'
  }

  const properStyle = () => {
    if(errorMessage){
      return (
        errorMessage.type === 'notice'
          ? styleNotice
          : styleError
      )
    }
  }

  if(errorMessage){
    return (
      <div style={properStyle()}>
        <h2>{errorMessage.text}</h2>
      </div>
    )
  } else {
    return (<br />)
  }
}

export default Messager