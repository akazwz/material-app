import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import CssBaseline from '@mui/material/CssBaseline'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import LeftDrawer from '../components/dashboard/LeftDrawer'
import AccountMenu from '../components/dashboard/AccountMenu'
import MoreMenu from '../components/dashboard/MoreMenu'
import { AppearanceSetting } from '../components/dashboard/AppearanceSetting'

const drawerWidth = 240

const Dashboard = () => {
  const ref = useRef(null)
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const [open, setOpen] = useState(false)
  const [drawerVariant, setDrawerVariant] = useState<'temporary' | 'permanent'>('temporary')
  const [anchorElAccountMenu, setAnchorElAccountMenu] = React.useState<null | HTMLElement>(null)
  const [anchorElMoreMenu, setAnchorElMoreMenu] = React.useState<null | HTMLElement>(null)
  const accountMenuOpen = Boolean(anchorElAccountMenu)
  const moreMenuOpen = Boolean(anchorElMoreMenu)

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccountMenu(event.currentTarget)
  }

  const handleAccountMenuClose = () => {
    setAnchorElAccountMenu(null)
  }

  useEffect(() => {
    let variant: 'permanent' | 'temporary'
    variant = upMd ? 'permanent' : 'temporary'
    setOpen(upMd)
    setDrawerVariant(variant)
  }, [upMd])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerVariant('temporary')
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }} ref={ref}>
      <CssBaseline/>
      <AppBar
        color="default"
        position="fixed"
        enableColorOnDark={true}
        sx={{
          backgroundColor: 'primary.main',
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          padding: 0,
          boxShadow: 0,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon/>
          </IconButton>
          <Box sx={{ flexGrow: 1 }}/>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <AppearanceSetting/>
            <Tooltip title="Account settings">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleAvatarClick}
              >
                <Avatar
                  src={''}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
        <AccountMenu
          open={accountMenuOpen}
          anchorEl={anchorElAccountMenu}
          handleOnClose={handleAccountMenuClose}
        />
        <MoreMenu
          open={moreMenuOpen}
          anchorEl={anchorElMoreMenu}
          handleOnClose={() => setAnchorElMoreMenu(null)}
        />
      </AppBar>
      <LeftDrawer
        container={ref.current}
        variant={drawerVariant}
        open={open}
        onClose={upMd ? undefined : handleDrawerClose}
        keepMounted={!upMd}
        drawerWidth={drawerWidth}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar/>
      </Box>
    </Box>
  )
}

export default Dashboard
