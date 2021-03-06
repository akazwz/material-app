import React from 'react'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { styled } from '@mui/material/styles'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { AppBar, Drawer, Stack } from '@mui/material'
import logo from '../../logo.png'

const LeftDrawer = (props: any) => {
  const { container, variant, open, onClose, keepMounted, drawerWidth } = props

  const DrawerHeader = styled('div')((theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))

  return (
    <Drawer
      container={container}
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: keepMounted, // Better open performance on mobile.
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <DrawerHeader>
        <Avatar src={logo}/>
        <Typography>
          Mui App
        </Typography>
      </DrawerHeader>
      <List sx={{ width: '100%' }}>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text} sx={{ width: '100%' }}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
            </ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default LeftDrawer
