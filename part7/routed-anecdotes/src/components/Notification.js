import React from 'react'

const Notification = ({ notification }) => {
  const style = {
    display: notification ? 'block' : 'none'
  }

  return (
    <div className='notification' style={style}>
      {notification}
    </div>
  )
}

export default Notification