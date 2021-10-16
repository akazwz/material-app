import React, {useState} from 'react';
import Container from '@mui/material/Container/Container';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import {HexColorPicker} from "react-colorful";

const ColorPicker = () => {
    const [color, setColor] = useState('#ffffff');
    const handleChangeComplete = (color: any) => {
        setColor(color);
    }
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container style={{
                backgroundColor: 'transparent',
            }}>
                <HexColorPicker
                    style={{
                        backgroundColor: 'transparent',
                        width: '170px',
                        height: '170px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                    color={color}
                    onChange={handleChangeComplete}
                />
            </Container>
        </React.Fragment>
    );
}

export default ColorPicker;
