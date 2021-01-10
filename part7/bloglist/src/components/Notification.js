import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from '@material-ui/lab'

import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (notification) {
      clearTimeout(timer)
      const newTimeout = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
      setTimer(newTimeout)
    }
  }, [dispatch, notification]) // eslint-disable-line

  if ( !notification ) {
    return null
  }
  return (
    <div>
      <Alert severity={notification.type}>
        {notification.message}
      </Alert>
    </div>
  )
}

export default Notification
