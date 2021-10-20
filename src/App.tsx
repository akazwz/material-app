import React, {Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import Backdrop from '@mui/material/Backdrop/Backdrop';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAppSelector} from './hooks/hooks';
import SignInSide from './pages/SignInSide';
import FabSettings from './pages/FabSettings';
import {theme} from './redux/theme';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './route/PrivateRoute';
import HomePage from './pages/HomePage';
import './App.css';
import SignUp from "./pages/SignUp";

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
                <CircularProgress color='inherit' />
            </Backdrop>
        }>
            <ThemeProvider theme={themeCustom}>
                <React.Fragment>
                    <FullScreen handle={handle}>
                        <Switch>
                            <PrivateRoute path='/dashboard' component={Dashboard} />
                            <Route path='/sign-in' component={SignInSide} />
                            <Route path='/sign-up' component={SignUp} />
                            <Route path='/' component={HomePage} />
                        </Switch>
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
