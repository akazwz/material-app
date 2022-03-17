import React, { useRef, useState } from 'react'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton/IconButton'
import ColorizeIcon from '@mui/icons-material/Colorize'
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined'
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined'
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import Drawer from '@mui/material/Drawer'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useTranslation } from 'react-i18next'
import MuiSwitchThemeMode from '../MuiSwitchThemeMode'
import MuiSwitchLanguage from '../MuiSwitchLanguage'
import ColorPickerDialog from '../ColorPickerDialog'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'
import { Tooltip } from '@mui/material'

export const AppearanceSetting = () => {
  const { t, i18n } = useTranslation()
  let lang = i18n.language
  if (!lang) {
    lang = 'zh'
  }
  // use for container
  const ref = useRef(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  let mainColorInit = ''
  let secondColorInit = ''
  let themeModeInit = ''
  const [mainColor, setMainColor] = useState(mainColorInit)
  const [secondColor, setSecondColor] = useState(secondColorInit)
  const [dialogColorPickerMain, setDialogColorPickerMain] = useState(false)
  const [dialogColorPickerSecond, setDialogColorPickerSecond] = useState(false)
  const [switchDarkMode, setSwitchDarkMode] = useState(themeModeInit === 'dark')
  const [switchLangEn, setSwitchLangEn] = useState(lang === 'en')

  const handleSettingOnClick = () => {
    setDrawerOpen(true)
  }

  const handleDrawerOnClose = () => {
    setDrawerOpen(false)
  }

  const handleMainColorInputOnChange = (value: string) => {
    setMainColor(value)
    if (value.length === 7) {
      localStorage.setItem('mainColor', value)
    }
  }

  const handleMainColorPickerChange = (color: string) => {
    setMainColor(color)
    localStorage.setItem('mainColor', color)
  }

  const handleSecondColorInputOnChange = (value: string) => {
    setSecondColor(value)
    if (value.length === 4 || value.length === 7) {
      localStorage.setItem('secondColor', value)
    }
  }

  const handleSecondColorPickerChange = (color: string) => {
    setSecondColor(color)
    localStorage.setItem('secondColor', color)
  }

  return (
    <>
      <Tooltip title="Appearance settings">
      <IconButton
        size="large"
        aria-label="show 4 new mails"
        color="inherit"
        onClick={handleSettingOnClick}
      >
        <SettingsOutlinedIcon/>
      </IconButton>
      </Tooltip>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerOnClose}
      >
        <Box
          sx={{ width: 300 }}
          role="presentation"
        >
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {t('fabSettings.settings')}
              </ListSubheader>
            }
          >
            <ListItem button key="themeMode">
              <ListItemIcon>
                <SettingsBrightnessOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={t('fabSettings.themeMode')}/>
              <MuiSwitchThemeMode checked={switchDarkMode} onChange={() => {
                if (!switchDarkMode) {
                  localStorage.setItem('themeMode', 'dark')
                } else {
                  localStorage.setItem('themeMode', 'light')
                }
                setSwitchDarkMode(!switchDarkMode)
              }}/>
            </ListItem>
            <ListItem button key="languages">
              <ListItemIcon>
                <TranslateOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={t('fabSettings.languages')}/>
              <MuiSwitchLanguage checked={switchLangEn} onChange={() => {
                if (!switchLangEn) {
                  localStorage.setItem('language', 'en')
                  i18n.changeLanguage('en').then()
                } else {
                  localStorage.setItem('language', 'zh')
                  i18n.changeLanguage('zh').then()
                }
                setSwitchLangEn(!switchLangEn)
              }}/>
            </ListItem>
            <ListItem button key="mainColor">
              <ListItemIcon>
                <FormatColorFillOutlinedIcon/>
              </ListItemIcon>
              <ListItemText primary={t('fabSettings.mainColor')}/>
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setDialogColorPickerMain(true)}
              >
                <PaletteOutlinedIcon color="primary"/>
              </IconButton>
            </ListItem>
            <ListItem button key="secondColor">
              <ListItemIcon>
                <ColorizeIcon/>
              </ListItemIcon>
              <ListItemText id="switch-list-label-wifi" primary={t('fabSettings.secondColor')}/>
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setDialogColorPickerSecond(true)}
              >
                <PaletteOutlinedIcon color="secondary"/>
              </IconButton>
            </ListItem>
          </List>
          <Divider/>
          <ColorPickerDialog
            container={ref.current}
            open={dialogColorPickerMain}
            initColor={mainColorInit}
            handleColorPickerChange={handleMainColorPickerChange}
            handleColorInputOnChange={handleMainColorInputOnChange}
            handleConfirmBtn={() => {
              setDialogColorPickerMain(false)
            }}
            color={mainColor}
            primaryOrSecondary="primary"
          />
          <ColorPickerDialog
            container={ref.current}
            open={dialogColorPickerSecond}
            initColor={secondColorInit}
            handleColorPickerChange={handleSecondColorPickerChange}
            handleColorInputOnChange={handleSecondColorInputOnChange}
            handleConfirmBtn={() => {
              setDialogColorPickerSecond(false)
            }}
            color={secondColor}
            primaryOrSecondary="secondary"
          />
        </Box>
      </Drawer>
    </>
  )
}
