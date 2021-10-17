import React, {ChangeEvent, useState} from 'react';
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
import {ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import ColorizeIcon from '@mui/icons-material/Colorize';
import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';

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
    const [color, setColor] = useState(mainColorInit);
    const [dialogColorPicker, setDialogColorPicker] = useState(false);

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
                localStorage.setItem('themeMode', 'light');
                break;
            case 'dark':
                mode = 'dark';
                setThemeModeCustom('dark');
                localStorage.setItem('themeMode', 'dark');
                break
            default:
                mode = 'light';
                setThemeModeCustom('light');
                localStorage.setItem('themeMode', 'light');
        }

        dispatch(setThemeMode(mode));
    };

    const handleLanguagesOnChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        localStorage.setItem('language', value);
        i18n.changeLanguage(value).then();
        setLangCustom(value);
    };

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

    const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
        <Tooltip {...props} classes={{popper: className}}/>
    ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));

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
                            <ListItemIcon>
                                <SettingsBrightnessOutlinedIcon/>
                            </ListItemIcon>
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
                            <ListItemIcon>
                                <TranslateOutlinedIcon/>
                            </ListItemIcon>
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
                                <FormatColorFillOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText id='switch-list-label-wifi' primary='Main Color'/>
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
                            <ListItemText id='switch-list-label-wifi' primary='Second Color'/>
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => setDialogColorPicker(true)}
                            >
                                <PaletteOutlinedIcon color='secondary'/>
                            </IconButton>
                        </ListItem>
                    </List>
                    <Divider/>
                    <Dialog
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
        </React.Fragment>
    );
}

export default FabSettings;
