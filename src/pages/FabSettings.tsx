import React, {ChangeEvent, useRef, useState} from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppBar from '@mui/material/AppBar';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from "@mui/material/IconButton/IconButton";
import Button from '@mui/material/Button';
import ColorizeIcon from '@mui/icons-material/Colorize';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Drawer from '@mui/material/Drawer';
import {useTranslation} from 'react-i18next';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
// @ts-ignore
import fscreen from 'fscreen';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {setThemeMode, setThemeMainColor, theme} from '../redux/theme';
import MuiSwitchThemeMode from '../components/MuiSwitchThemeMode';
import MuiSwitchLanguage from '../components/MuiSwitchLanguage';
import ColorPicker from '../components/ColorPicker';

const FabSettings = (props: any) => {
    const {t, i18n} = useTranslation();
    let lang = i18n.language;
    if (!lang) {
        lang = 'zh';
    }
    const [drawerOpen, setDrawerOpen] = useState(false);
    const themeValue = useAppSelector(theme);
    let mainColorInit = themeValue.theme.mainColor;
    let themeModeInit = themeValue.theme.mode;
    const [color, setColor] = useState(mainColorInit);
    const [dialogColorPicker, setDialogColorPicker] = useState(false);
    const [switchDarkMode, setSwitchDarkMode] = useState(themeModeInit === 'dark');
    const [switchLangEn, setSwitchLangEn] = useState(lang === 'en');

    const dispatch = useAppDispatch();

    const handleSettingOnClick = () => {
        setDrawerOpen(true);
    }

    const handleDrawerOnClose = () => {
        setDrawerOpen(false);
    }

    const handleColorInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setColor(value);
        if (value.length === 7) {
            dispatch(setThemeMainColor(value));
            localStorage.setItem('mainColor', value);
        }
    };

    const handleColorPickerChange = (color: string) => {
        setColor(color);
        dispatch(setThemeMainColor(color));
        localStorage.setItem('mainColor', color);
    }

    const ref = useRef(null);
    return (
        <div ref={ref}>
            <AppBar
                position='static'
                color='default'>
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
                container={ref.current}
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
                        <ListItem button key='themeMode'>
                            <ListItemIcon>
                                <SettingsBrightnessOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t('fabSettings.themeMode')}/>
                            <MuiSwitchThemeMode checked={switchDarkMode} onChange={() => {
                                if (!switchDarkMode) {
                                    dispatch(setThemeMode('dark'));
                                    localStorage.setItem('themeMode', 'dark');
                                } else {
                                    dispatch(setThemeMode('light'));
                                    localStorage.setItem('themeMode', 'light');
                                }
                                setSwitchDarkMode(!switchDarkMode);
                            }}/>
                        </ListItem>
                        <ListItem button key='languages'>
                            <ListItemIcon>
                                <TranslateOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t('fabSettings.languages')}/>
                            <MuiSwitchLanguage checked={switchLangEn} onChange={() => {
                                if (!switchLangEn) {
                                    localStorage.setItem('language', 'en');
                                    i18n.changeLanguage('en').then();
                                } else {
                                    localStorage.setItem('language', 'zh');
                                    i18n.changeLanguage('zh').then();
                                }
                                setSwitchLangEn(!switchLangEn);
                            }}/>
                        </ListItem>
                        <ListItem button key='mainColor'>
                            <ListItemIcon>
                                <FormatColorFillOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t('fabSettings.mainColor')}/>
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => setDialogColorPicker(true)}
                            >
                                <PaletteOutlinedIcon color='primary'/>
                            </IconButton>
                        </ListItem>
                        <ListItem button key='mainColor'>
                            <ListItemIcon>
                                <ColorizeIcon/>
                            </ListItemIcon>
                            <ListItemText id='switch-list-label-wifi' primary={t('fabSettings.secondColor')}/>
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => setDialogColorPicker(true)}
                            >
                                <PaletteOutlinedIcon color='secondary'/>
                            </IconButton>
                        </ListItem>
                    </List>
                    <Divider/>
                    <Button onClick={() => {
                        if (fscreen.fullscreenEnabled) {
                            if (props.fullScreenActive) {
                                props.fullScreenExit();
                            } else {
                                props.fullScreenEnter();
                            }
                        } else {
                            alert('can not')
                        }
                    }}>
                        btn
                    </Button>
                    <Dialog
                        container={ref.current}
                        sx={{'& .MuiDialog-paper': {width: '80%', maxHeight: 435}}}
                        maxWidth='xs'
                        open={dialogColorPicker}
                    >
                        <DialogTitle color='primary'>Color Picker</DialogTitle>
                        <DialogContent dividers sx={{
                            textAlign: 'center',
                        }}>
                            <ColorPicker
                                initColor={mainColorInit}
                                handleColorChange={handleColorPickerChange}
                            />
                            <TextField
                                label='Outlined secondary'
                                color='primary'
                                value={color}
                                size='small'
                                onChange={handleColorInputOnChange}
                                sx={{marginTop: 3}}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialogColorPicker(false)}>Save changes</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Drawer>
        </div>
    );
}

export default FabSettings;
