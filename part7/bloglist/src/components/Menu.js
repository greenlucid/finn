import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'


const Menu = ({ handleLogout }) => {
  return (
    <div className='Menu'>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to='/'>
            home
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
          <Button color='inherit' onClick={handleLogout}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Menu