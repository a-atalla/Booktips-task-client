import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography type='title' color='inherit'>
            Google Books Finder
          </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
