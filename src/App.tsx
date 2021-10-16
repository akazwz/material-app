import React, {Suspense} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAppSelector} from './hooks/hooks';
import {themeValue} from './redux/theme';
import SignInSide from './pages/SighInSide';
import FabSettings from "./pages/FabSettings";
import './App.css';

function App() {
    const themeType = useAppSelector(themeValue);
    const theme = createTheme({
        palette: {
            mode: themeType,
        },
    });

    return (
        <Suspense fallback={"loading..."}>
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <SignInSide/>
                    <FabSettings/>
                </React.Fragment>
            </ThemeProvider>
        </Suspense>
    );
}

export default App;
