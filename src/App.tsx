import React, {Suspense} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAppSelector} from './hooks/hooks';
import SignInSide from './pages/SighInSide';
import FabSettings from "./pages/FabSettings";
import './App.css';
import Backdrop from '@mui/material/Backdrop/Backdrop';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {theme} from "./redux/theme";

function App() {
    const themeValue = useAppSelector(theme);
    let mainColor = themeValue.theme.mainColor;
    let themeMode = themeValue.theme.mode;
    if (!mainColor) {
        mainColor = '#3f50b5';
    }
    const themeCustom = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: mainColor,
            }
        },
    });

    return (
        <Suspense fallback={
            <Backdrop
                open={true}
            >
                <CircularProgress color='inherit'/>
            </Backdrop>
        }>
            <ThemeProvider theme={themeCustom}>
                <React.Fragment>
                    <SignInSide/>
                    <FabSettings/>
                </React.Fragment>
            </ThemeProvider>
        </Suspense>
    );
}

export default App;
