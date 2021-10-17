import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ColorPicker from "./ColorPicker";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

const ColorPickerDialog = (props: any) => {
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
            <DialogTitle color={primaryOrSecondary}>Color Picker</DialogTitle>
            <DialogContent dividers sx={{
                textAlign: 'center',
            }}>
                <ColorPicker
                    initColor={initColor}
                    handleColorChange={handleColorPickerChange}
                />
                <TextField
                    label='Outlined secondary'
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
                <Button color={primaryOrSecondary} onClick={handleConfirmBtn}>Save changes</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ColorPickerDialog;