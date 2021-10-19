import React, {Suspense} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import Backdrop from '@mui/material/Backdrop/Backdrop';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAppSelector} from './hooks/hooks';
import SignInSide from './pages/SighInSide';
import FabSettings from './pages/FabSettings';
import {theme} from './redux/theme';
import Dashboard from './pages/Dashboard';
import './App.css';
import {auth} from "./redux/auth";
import PrivateRoute from "./route/PrivateRoute";

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
                            <Route path="/sign-in">
                                <SignInSide />
                            </Route>
                            <PrivateRoute path="/dashboard/">
                                <Dashboard />
                            </PrivateRoute>
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
