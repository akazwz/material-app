import React, {useRef, useState} from 'react';
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
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useTranslation} from 'react-i18next';
// @ts-ignore
import fscreen from 'fscreen';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {setThemeMode, setThemeMainColor, theme, setThemeSecondColor} from '../redux/theme';
import MuiSwitchThemeMode from '../components/MuiSwitchThemeMode';
import MuiSwitchLanguage from '../components/MuiSwitchLanguage';
import ColorPickerDialog from '../components/ColorPickerDialog';

const FabSettings = (props: any) => {
    const {t, i18n} = useTranslation();
    let lang = i18n.language;
    if (!lang) {
        lang = 'zh';
    }
    // use for container
    const ref = useRef(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const themeValue = useAppSelector(theme);
    let mainColorInit = themeValue.theme.mainColor;
    let secondColorInit = themeValue.theme.secondColor;
    let themeModeInit = themeValue.theme.mode;
    const [mainColor, setMainColor] = useState(mainColorInit);
    const [secondColor, setSecondColor] = useState(secondColorInit);
    const [dialogColorPickerMain, setDialogColorPickerMain] = useState(false);
    const [dialogColorPickerSecond, setDialogColorPickerSecond] = useState(false);
    const [switchDarkMode, setSwitchDarkMode] = useState(themeModeInit === 'dark');
    const [switchLangEn, setSwitchLangEn] = useState(lang === 'en');

    const dispatch = useAppDispatch();

    const handleSettingOnClick = () => {
        setDrawerOpen(true);
    }

    const handleDrawerOnClose = () => {
        setDrawerOpen(false);
    }

    const handleMainColorInputOnChange = (value: string) => {
        setMainColor(value);
        if (value.length === 7) {
            dispatch(setThemeMainColor(value));
            localStorage.setItem('mainColor', value);
        }
    };

    const handleMainColorPickerChange = (color: string) => {
        setMainColor(color);
        dispatch(setThemeMainColor(color));
        localStorage.setItem('mainColor', color);
    }

    const handleSecondColorInputOnChange = (value: string) => {
        setSecondColor(value);
        if (value.length === 4 || value.length === 7) {
            dispatch(setThemeSecondColor(value));
            localStorage.setItem('secondColor', value);
        }
    };

    const handleSecondColorPickerChange = (color: string) => {
        setSecondColor(color);
        dispatch(setThemeSecondColor(color));
        localStorage.setItem('secondColor', color);
    }

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
                    <SettingsOutlinedIcon onClick={handleSettingOnClick} />
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
                                <SettingsBrightnessOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('fabSettings.themeMode')} />
                            <MuiSwitchThemeMode checked={switchDarkMode} onChange={() => {
                                if (!switchDarkMode) {
                                    dispatch(setThemeMode('dark'));
                                    localStorage.setItem('themeMode', 'dark');
                                } else {
                                    dispatch(setThemeMode('light'));
                                    localStorage.setItem('themeMode', 'light');
                                }
                                setSwitchDarkMode(!switchDarkMode);
                            }} />
                        </ListItem>
                        <ListItem button key='languages'>
                            <ListItemIcon>
                                <TranslateOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('fabSettings.languages')} />
                            <MuiSwitchLanguage checked={switchLangEn} onChange={() => {
                                if (!switchLangEn) {
                                    localStorage.setItem('language', 'en');
                                    i18n.changeLanguage('en').then();
                                } else {
                                    localStorage.setItem('language', 'zh');
                                    i18n.changeLanguage('zh').then();
                                }
                                setSwitchLangEn(!switchLangEn);
                            }} />
                        </ListItem>
                        <ListItem button key='mainColor'>
                            <ListItemIcon>
                                <FormatColorFillOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('fabSettings.mainColor')} />
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => setDialogColorPickerMain(true)}
                            >
                                <PaletteOutlinedIcon color='primary' />
                            </IconButton>
                        </ListItem>
                        <ListItem button key='secondColor'>
                            <ListItemIcon>
                                <ColorizeIcon />
                            </ListItemIcon>
                            <ListItemText id='switch-list-label-wifi' primary={t('fabSettings.secondColor')} />
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => setDialogColorPickerSecond(true)}
                            >
                                <PaletteOutlinedIcon color='secondary' />
                            </IconButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <Button
                        variant='outlined'
                        size='large'
                        fullWidth={true}
                        startIcon={props.fullScreenActive ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        onClick={() => {
                            if (fscreen.fullscreenEnabled) {
                                if (props.fullScreenActive) {
                                    props.fullScreenExit();
                                } else {
                                    props.fullScreenEnter();
                                }
                            } else {
                                alert(t('fabSettings.notSupported'));
                            }
                        }}
                        sx={{
                            marginTop: '30px',
                        }}
                    >
                        {props.fullScreenActive ? t('fabSettings.exitFullScreen') : t('fabSettings.fullScreen')}
                    </Button>
                    <ColorPickerDialog
                        container={ref.current}
                        open={dialogColorPickerMain}
                        initColor={mainColorInit}
                        handleColorPickerChange={handleMainColorPickerChange}
                        handleColorInputOnChange={handleMainColorInputOnChange}
                        handleConfirmBtn={() => {
                            setDialogColorPickerMain(false);
                        }}
                        color={mainColor}
                        primaryOrSecondary='primary'
                    />
                    <ColorPickerDialog
                        container={ref.current}
                        open={dialogColorPickerSecond}
                        initColor={secondColorInit}
                        handleColorPickerChange={handleSecondColorPickerChange}
                        handleColorInputOnChange={handleSecondColorInputOnChange}
                        handleConfirmBtn={() => {
                            setDialogColorPickerSecond(false);
                        }}
                        color={secondColor}
                        primaryOrSecondary='secondary'
                    />
                </Box>
            </Drawer>
        </div>
    );
}

export default FabSettings;
