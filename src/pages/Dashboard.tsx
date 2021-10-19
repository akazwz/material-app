import React, {useEffect, useRef, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {useAppSelector} from "../hooks/hooks";
import {auth} from '../redux/auth';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import {Drawer, useMediaQuery} from "@mui/material";
import {styled, useTheme} from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from "@mui/material/Avatar";
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

    const DrawerHeader = styled('div')(({theme}) => ({
        display: 'flex',
        color: 'primary',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'center',
    }));

    return (
        <Box sx={{display: 'flex'}} ref={ref}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{width: {md: `calc(100% - ${drawerWidth}px)`}, ml: {md: `${drawerWidth}px`}}}
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
        </Box>
    );
};

export default Dashboard;
