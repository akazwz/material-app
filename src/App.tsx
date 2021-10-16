import React, {useState} from 'react';
import {useAppSelector} from './hooks/hooks';
import SignInSide from './pages/SighInSide';
import {themeValue} from './redux/theme';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import {green} from '@mui/material/colors';
import Box from '@mui/material/Box';
import {SxProps} from '@mui/system';
import {Drawer, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListSubheader from '@mui/material/ListSubheader';

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const themeType = useAppSelector(themeValue);
    const theme = createTheme({
        palette: {
            mode: themeType,
        },
    });

    const handleSettingOnClick = () => {
        setDrawerOpen(true);
    }

    const handleDrawerOnClose = () => {
        setDrawerOpen(false);
    }


    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <SignInSide/>
                <AppBar position='static' color='default'>
                    <Fab
                        size='medium'
                        color='primary'
                        aria-label='add'
                        style={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                        }}
                    >
                        <SettingsOutlinedIcon onClick={handleSettingOnClick}/>
                    </Fab>
                </AppBar>
                <Drawer
                    anchor='right'
                    open={drawerOpen}
                    onClose={handleDrawerOnClose}
                >
                    <Box
                        sx={{width: 300}}
                        role='presentation'
                    >
                        <List
                            subheader={
                                <ListSubheader component='div' id='nested-list-subheader'>
                                    Settings
                                </ListSubheader>
                            }
                        >
                            <ListItem button key='theme'>
                                <FormControl fullWidth>
                                    <InputLabel id='demo-controlled-open-select-label'>Theme</InputLabel>
                                    <Select
                                        labelId='demo-controlled-open-select-label'
                                        id='demo-controlled-open-select'
                                        label='Theme'
                                    >
                                        <MenuItem value={10}>Light</MenuItem>
                                        <MenuItem value={20}>Dark</MenuItem>
                                        <MenuItem value={30}>Native</MenuItem>
                                    </Select>
                                </FormControl>

                            </ListItem>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                        <Divider/>
                    </Box>
                </Drawer>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default App;
