import React, {useEffect, useRef, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Drawer, useMediaQuery} from "@mui/material";
import {styled, useTheme} from '@mui/material/styles';
import {useAppSelector} from '../hooks/hooks';
import {auth} from '../redux/auth';
import logo from '../logo.png';

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

    useEffect(() => {
        variant = upMd ? 'permanent' : 'temporary';
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

    const DrawerHeader = styled('div')(() => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 0),
        ...theme.mixins.toolbar,
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
    }));

    return (
        <Box sx={{display: 'flex'}} ref={ref}>
            <CssBaseline />
            <AppBar
                color='default'
                position="fixed"
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
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerOpen}
                    >
                        {open ? null : <MenuIcon />}
                    </IconButton>
                    <Typography>
                        {open ? 'Open' : 'Not Open'}
                        {''}
                        {authValue.auth.username}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                container={ref.current}
                variant={drawerVariant}
                anchor="left"
                open={open}
                onClose={upMd ? undefined : handleDrawerClose}
                ModalProps={{
                    keepMounted: !upMd, // Better open performance on mobile.
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
            >
                <DrawerHeader>
                    <Avatar alt="log" src={logo} sx={{width: 48, height: 48}} />
                    <Typography>
                        Material App
                    </Typography>
                </DrawerHeader>
                <List sx={{width: '100%'}}>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text} sx={{width: '100%'}}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {md: `calc(100% - ${drawerWidth}px)`}}}
            >
                <Toolbar />
                <Switch>
                    <Route path="/dashboard/">
                        over view
                    </Route>
                    <Route path="/dashboard/users/">
                        users
                    </Route>
                </Switch>
            </Box>
        </Box>
    )
        ;
};

export default Dashboard;
