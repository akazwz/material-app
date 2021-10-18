import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {useTranslation} from 'react-i18next';
import ColorPicker from './ColorPicker';

const ColorPickerDialog = (props: any) => {
    const {t} = useTranslation();
    const {
        container,
        open,
        initColor,
        handleColorPickerChange,
        handleColorInputOnChange,
        handleConfirmBtn,
        color,
        primaryOrSecondary,
    } = props;
    return (
        <Dialog
            container={container}
            sx={{'& .MuiDialog-paper': {width: '80%', maxHeight: 435}}}
            maxWidth='xs'
            open={open}
        >
            <DialogTitle color={primaryOrSecondary}>
                {t('colorPicker.colorPicker')}
            </DialogTitle>
            <DialogContent dividers sx={{
                textAlign: 'center',
            }}>
                <ColorPicker
                    initColor={initColor}
                    handleColorChange={handleColorPickerChange}
                />
                <TextField
                    label={t('colorPicker.color')}
                    color={primaryOrSecondary}
                    value={color}
                    size='small'
                    onChange={(event) => {
                        handleColorInputOnChange(event.target.value);
                    }}
                    sx={{marginTop: 3}}
                />
            </DialogContent>
            <DialogActions>
                <Button color={primaryOrSecondary} onClick={handleConfirmBtn}>
                    {t('colorPicker.ok')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ColorPickerDialog;
