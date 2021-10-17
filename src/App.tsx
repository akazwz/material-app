import React, {Suspense} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAppSelector} from './hooks/hooks';
import SignInSide from './pages/SighInSide';
import FabSettings from "./pages/FabSettings";
import Backdrop from '@mui/material/Backdrop/Backdrop';
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {theme} from "./redux/theme";
import './App.css';

function App() {
    const themeValue = useAppSelector(theme);
    let mainColor = themeValue.theme.mainColor;
    let secondColor = themeValue.theme.secondColor;
    let themeMode = themeValue.theme.mode;
    if (!mainColor) {
        mainColor = '#3f50b5';
    }
    if (!secondColor) {
        secondColor = '#ab47bc'
    }
    const themeCustom = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: mainColor,
            },
            secondary: {
                main: secondColor,
            },
        },
    });
    const handle = useFullScreenHandle();

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
                    <FullScreen handle={handle}>
                        <SignInSide/>
                        <FabSettings
                            fullScreenEnter={handle.enter}
                            fullScreenExit={handle.exit}
                            fullScreenActive={handle.active}
                        />
                    </FullScreen>

                </React.Fragment>
            </ThemeProvider>
        </Suspense>
    );
}

export default App;
