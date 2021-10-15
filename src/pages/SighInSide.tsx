import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl, {useFormControl} from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Copyright from '../components/Copyright';
import {ChangeEvent, SyntheticEvent, useState} from "react";
import InputAdornment from '@mui/material/InputAdornment';

const theme = createTheme();

const SignInSide = () => {
    const [phoneError, setPhoneError] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [phone, setPhone] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('phone'),
            password: data.get('password'),
        });
    };

    const handlePhoneOnBlur = () => {
        let reg = /^1[3456789]\d{9}$/;
        if (phone === '') {
            setPhoneError(false);
            return;
        }
        if (reg.test(phone)) {
            setPhoneError(false);
        } else {
            setPhoneError(true);
        }
    }

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!isNaN(Number(value))) {
            setPhone(value);
        } else {
            setPhoneError(true);
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container component='main' sx={{height: '100vh'}}>
                <CssBaseline/>
                {/*side image*/}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Sign in
                        </Typography>
                        <Box component='form' noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='phone'
                                label='Phone Number'
                                name='phone'
                                autoComplete='off'
                                autoFocus
                                InputProps={{
                                    startAdornment: <InputAdornment position='start'>+86</InputAdornment>,
                                }}
                                error={phoneError}
                                onBlur={handlePhoneOnBlur}
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                error={pwdError}
                            />
                            <FormControlLabel
                                control={<Checkbox value='remember' color='primary'/>}
                                label='Remember me'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='#' variant='body2'>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href='#' variant='body2'>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignInSide;
