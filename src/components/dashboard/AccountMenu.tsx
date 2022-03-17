import React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Menu from '@mui/material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Chip, Typography } from '@mui/material'
import Box from '@mui/material/Box'

const AccountMenu = (props: any) => {
  let navigate = useNavigate()
  const { open, anchorEl, handleOnClose } = props
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleOnClose}
      PaperProps={{
        elevation: 0,
        sx: {
          width: '240px',
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <Avatar sx={{ width: 32, height: 32 }}/>
        <Typography variant="inherit" noWrap marginLeft="10px">
          username
        </Typography>
      </MenuItem>
      <Divider/>
      <MenuItem>
        <ListItemIcon>
          <PersonAdd fontSize="small"/>
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small"/>
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={() => {
        localStorage.removeItem('user')
        navigate('/sign-in')
      }}>
        <ListItemIcon>
          <Logout fontSize="small"/>
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  )
}

export default AccountMenu
