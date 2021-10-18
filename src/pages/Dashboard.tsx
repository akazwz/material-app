import React from 'react';
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import {useAppSelector} from "../hooks/hooks";
import {auth} from '../redux/auth';

const Dashboard = () => {
    const authValue = useAppSelector(auth);
    return (
        <Grid container component='main' sx={{height: '100vh'}}>
            <CssBaseline />
            {/*side image*/}
            <Grid>
                dashboard.
                {authValue.auth.token}
            </Grid>
        </Grid>
    );
};

export default Dashboard;
