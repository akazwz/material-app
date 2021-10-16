import React, {useState} from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppBar from '@mui/material/AppBar';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Drawer from '@mui/material/Drawer';
import InputLabel from '@mui/material/InputLabel';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {setDark, setLight, themeValue} from '../redux/theme';


const FabSettings = () => {
    const {t, i18n} = useTranslation();
    let lang = i18n.language;
    const [drawerOpen, setDrawerOpen] = useState(false);

    const dispatch = useAppDispatch();
    const themeType = useAppSelector(themeValue);

    const handleSettingOnClick = () => {
        setDrawerOpen(true);
    }

    const handleDrawerOnClose = () => {
        setDrawerOpen(false);
    }

    const handleThemeOnChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        switch (value) {
            case 'light':
                dispatch(setLight());
                localStorage.setItem('theme', 'light');
                return;
            case 'dark':
                dispatch(setDark());
                localStorage.setItem('theme', 'dark');
                return;
            default:
                dispatch(setLight());
        }
    };

    const handleLanguagesOnChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        localStorage.setItem('language', value);
        i18n.changeLanguage(value).then();
    };

    return (
        <React.Fragment>
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
                                {t('FabSettings.settings')}
                            </ListSubheader>
                        }
                    >
                        <ListItem button key='theme'>
                            <FormControl fullWidth>
                                <InputLabel id='demo-controlled-open-select-label'>
                                    {t('FabSettings.theme')}
                                </InputLabel>
                                <Select
                                    labelId='demo-controlled-open-select-label'
                                    id='demo-controlled-open-select'
                                    label='Theme'
                                    defaultValue={themeType}
                                    onChange={handleThemeOnChange}
                                >
                                    <MenuItem value='light'>
                                        {t('FabSettings.light')}
                                    </MenuItem>
                                    <MenuItem value='dark'>
                                        {t('FabSettings.dark')}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem button key='languages'>
                            <FormControl fullWidth>
                                <InputLabel id='demo-controlled-open-select-label'>
                                    {t('FabSettings.languages')}
                                </InputLabel>
                                <Select
                                    labelId='demo-controlled-open-select-label'
                                    id='demo-controlled-open-select'
                                    label={t('FabSettings.languages')}
                                    defaultValue={lang}
                                    onChange={handleLanguagesOnChange}
                                >
                                    <MenuItem value='zh'>中文</MenuItem>
                                    <MenuItem value='en'>English</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                    </List>
                    <Divider/>
                </Box>
            </Drawer>
        </React.Fragment>
    );
}

export default FabSettings;
