import React, { useEffect } from 'react'

const ErrorShow = ({error, setError}) => {
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 10000)
    }
  }, [error]) // eslint-disable-line

  if (error) {
    return (
      <div style={{ color: 'red' }}>
        <h2><b>{error}</b></h2>
      </div>
    )
  }

  else {
    return null
  }
}

export default ErrorShow