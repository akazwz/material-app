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
import {setThemeMode, setThemeMainColor, theme} from '../redux/theme';
import ColorPicker from "../components/ColorPicker";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

const FabSettings = () => {
    const {t, i18n} = useTranslation();
    let lang = i18n.language;
    if (!lang) {
        lang = 'zh';
    }
    const [drawerOpen, setDrawerOpen] = useState(false);
    const themeValue = useAppSelector(theme);
    let mainColorInit = themeValue.theme.mainColor;
    let themeModeInit = themeValue.theme.mode;
    const [themeModeCustom, setThemeModeCustom] = useState(themeModeInit);
    const [langCustom, setLangCustom] = useState(lang);

    const dispatch = useAppDispatch();

    const handleSettingOnClick = () => {
        setDrawerOpen(true);
    }

    const handleDrawerOnClose = () => {
        setDrawerOpen(false);
    }

    const handleThemeOnChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        let mode: 'light' | 'dark';
        switch (value) {
            case 'light':
                mode = 'light'
                setThemeModeCustom('light');
                break;
            case 'dark':
                mode = 'dark';
                setThemeModeCustom('dark');
                break
            default:
                mode = 'light';
                setThemeModeCustom('light');
        }
        dispatch(setThemeMode(mode));
    };

    const handleLanguagesOnChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        localStorage.setItem('language', value);
        i18n.changeLanguage(value).then();
        setLangCustom(value);
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
                                {t('fabSettings.settings')}
                            </ListSubheader>
                        }
                    >
                        <ListItem button key='theme'>
                            <FormControl fullWidth>
                                <InputLabel id='demo-controlled-open-select-label'>
                                    {t('fabSettings.theme')}
                                </InputLabel>
                                <Select
                                    labelId='demo-controlled-open-select-label'
                                    id='demo-controlled-open-select'
                                    label='Theme'
                                    //defaultValue={themeType}
                                    value={themeModeCustom}
                                    onChange={handleThemeOnChange}
                                >
                                    <MenuItem value='light'>
                                        {t('fabSettings.light')}
                                    </MenuItem>
                                    <MenuItem value='dark'>
                                        {t('fabSettings.dark')}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem button key='languages'>
                            <FormControl fullWidth>
                                <InputLabel id='demo-controlled-open-select-label'>
                                    {t('fabSettings.languages')}
                                </InputLabel>
                                <Select
                                    labelId='demo-controlled-open-select-label'
                                    id='demo-controlled-open-select'
                                    label={t('fabSettings.languages')}
                                    value={langCustom}
                                    onChange={handleLanguagesOnChange}
                                >
                                    <MenuItem value='zh'>中文</MenuItem>
                                    <MenuItem value='en'>English</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem button key='mainColor'>
                            <ListItemIcon>
                                some
                            </ListItemIcon>
                            <ListItemText>
                                some
                            </ListItemText>
                            <ListItemButton>
                                btn
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider/>
                    <ColorPicker/>
                </Box>
            </Drawer>
        </React.Fragment>
    );
}

export default FabSettings;
