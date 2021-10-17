import React, {useState} from 'react';
import Container from '@mui/material/Container/Container';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import {HexColorPicker} from "react-colorful";

const ColorPicker = (props: any) => {
    const initColor = props.initColor;
    const handleColorChange = props.handleColorChange;
    const [color, setColor] = useState(initColor);
    const handleChange = (color: string) => {
        setColor(color);
        handleColorChange(color);
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
                    onChange={handleChange}
                />
            </Container>
        </React.Fragment>
    );
}

export default ColorPicker;
