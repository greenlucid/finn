import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const [timer, setTimer] = useState(null)
  const notification = useSelector(state => state.notification)
  const dispatcher = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: notification ? 'visible' : 'hidden'
  }

  useEffect(() => {
    if (notification) {
      clearTimeout(timer)
      const newTimeout = setTimeout(() => {dispatcher(clearNotification())}, 5000)
      setTimer(newTimeout)
    }
    
  }, [dispatcher, notification]) // eslint-disable-line

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification