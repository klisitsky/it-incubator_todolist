import * as React from 'react'
import { useCallback } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppSelector } from 'common/hooks'
import { authThunks } from 'features/auth/model/authSlice'
import { useActions } from 'common/hooks/useActions'

export function ButtonAppBar() {
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
  const { logout } = useActions(authThunks)
  const logOutHandler = useCallback(() => {
    logout()
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}>
            Your Todolist
          </Typography>
          {isLoggedIn && (
            <Button
              color='inherit'
              onClick={logOutHandler}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
