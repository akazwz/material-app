import React from 'react';
import {useAppSelector} from './hooks/hooks';
import SignInSide from './pages/SighInSide';
import {themeValue} from './redux/theme';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import './App.css';

function App() {
    const themeType = useAppSelector(themeValue);
    const theme = createTheme({
        palette: {
            mode: themeType,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <SignInSide/>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default App;
