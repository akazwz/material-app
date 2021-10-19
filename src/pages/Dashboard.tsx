import React, {useRef, useState} from 'react';
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

const Dashboard = () => {
    const authValue = useAppSelector(auth);
    const ref = useRef(null);
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = useState(false);
    let initVariant: 'temporary' | 'permanent' | 'persistent' | 'undefined'
    initVariant = 'permanent';
    const [drawerVariant, setDrawerVariant] = useState(initVariant);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const DrawerHeader = styled('div')(({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    return (
        <Box sx={{display: 'flex'}} ref={ref}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerOpen}
                        // drawer open, hide the icon button
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography>
                        Persistent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                container={ref.current}
                variant={drawerVariant}
                anchor="left"
                open={open}
                ModalProps={{
                    keepMounted: !upMd, // Better open performance on mobile.
                }}
                sx={{
                    width: 200,
                    flexShrink: 0,
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
            </Drawer>
        </Box>
    );
};

export default Dashboard;
