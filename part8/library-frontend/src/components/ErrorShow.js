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
      <div>
        {error}
      </div>
    )
  }

  else {
    return null
  }
}

export default ErrorShow