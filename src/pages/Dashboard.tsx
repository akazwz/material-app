import React, {useEffect, useRef, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import MailIcon from '@mui/icons-material/Mail';
import CssBaseline from '@mui/material/CssBaseline';
import {useMediaQuery} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useAppSelector} from '../hooks/hooks';
import {auth} from '../redux/auth';
import LeftDrawer from "../components/dashboard/LeftDrawer";
import MyAppBarSearch from "../components/dashboard/MyAppBarSearch";
import AccountMenu from "../components/dashboard/AccountMenu";

const drawerWidth = 240;

const Dashboard = () => {
    const authValue = useAppSelector(auth);
    const ref = useRef(null);
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = useState(false);
    let variant: 'temporary' | 'permanent';
    variant = 'temporary';
    const [drawerVariant, setDrawerVariant] = useState(variant);
    const [anchorElAccountMenu, setAnchorElAccountMenu] = React.useState<null | HTMLElement>(null);
    const accountMenuOpen = Boolean(anchorElAccountMenu);

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElAccountMenu(event.currentTarget);
    };

    const handleAccountMenuClose = () => {
        setAnchorElAccountMenu(null);
    };

    useEffect(() => {
        const variant = upMd ? 'permanent' : 'temporary';
        setOpen(upMd);
        // @ts-ignore
        setDrawerVariant(variant);
    }, [upMd]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        variant = 'temporary';
        // @ts-ignore
        setDrawerVariant(variant);
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}} ref={ref}>
            <CssBaseline />
            <AppBar
                color='default'
                position='fixed'
                enableColorOnDark={true}
                sx={{
                    backgroundColor: 'primary.main',
                    width: {md: `calc(100% - ${drawerWidth}px)`},
                    ml: {md: `${drawerWidth}px`},
                    padding: 0,
                    boxShadow: 0,
                }}
            >
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        sx={{mr: 2}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        {authValue.auth.user.username}
                    </Typography>
                    <MyAppBarSearch />
                    <Box sx={{flexGrow: 1}} />
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
                            <Badge badgeContent={4} color='error'>
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size='large'
                            aria-label='show 17 new notifications'
                            color='inherit'
                        >
                            <Badge badgeContent={17} color='error'>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Tooltip title="Account settings">
                            <IconButton
                                size='large'
                                edge='end'
                                aria-label='account of current user'
                                aria-haspopup='true'
                                color='inherit'
                                onClick={handleAvatarClick}
                            >
                                <Avatar
                                    src={authValue.auth.user.headerImg}
                                    sx={{width: 32, height: 32}}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size='large'
                            aria-label='show more'
                            aria-haspopup='true'
                            color='inherit'
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
                <AccountMenu
                    open={accountMenuOpen}
                    anchorEl={anchorElAccountMenu}
                    handleOnClose={handleAccountMenuClose}
                    handleOnClick={handleAccountMenuClose}
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
                component='main'
                sx={{flexGrow: 1, p: 3, width: {md: `calc(100% - ${drawerWidth}px)`}}}
            >
                <Toolbar />
                <Switch>
                    <Route path='/dashboard/'>
                        over view
                    </Route>
                    <Route path='/dashboard/users/'>
                        users
                    </Route>
                </Switch>
            </Box>
        </Box>
    )
        ;
};

export default Dashboard;
