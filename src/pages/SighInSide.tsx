import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Copyright from '../components/Copyright';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';

const theme = createTheme();

const SignInSide = () => {
    const [phoneError, setPhoneError] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneHelper, setPhoneHelper] = useState('');
    const [pwdError, setPwdError] = useState(false);
    const [password, setPassword] = useState('');
    const [pwdHelper, setPwdHelper] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('phone'),
            password: data.get('password'),
        });
    };

    const handlePhoneOnBlur = () => {
        let reg = /^1[3456789]\d{9}$/;
        if (phone === '') {
            setPhoneHelper('');
            setPhoneError(false);
            return;
        }
        if (reg.test(phone)) {
            setPhoneHelper('');
            setPhoneError(false);
        } else {
            setPhoneError(true);
            setPhoneHelper('Please Input The Right Phone Number.');
        }
    }

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length > 11) {
            return;
        }
        if (!isNaN(Number(value))) {
            setPhoneHelper('');
            setPhoneError(false);
            setPhone(value);
        } else {
            setPhoneError(true);
            setPhoneHelper('Only Number.');
        }
    }

    const handlePwdOnBlur = () => {
        const patternPwd = /^.*([0-9])+.*$/i;
        if (password === '') {
            setPwdHelper('');
            setPwdError(false);
            return;
        }
        if (password.length < 6) {
            setPwdError(true);
            setPwdHelper('Password length must > 6');
            return;
        }
        if (patternPwd.test(password)) {
            setPwdHelper('');
            setPhoneError(false);
        } else {
            setPhoneError(true);
            setPhoneHelper('Password must contains letters and math.');
        }
    }

    const handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        if (value.length < 30) {
            setPwdHelper('');
            setPwdError(false);
            setPassword(value);
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
                                helperText={phoneHelper}
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
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                autoComplete='off'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {password.length > 1 ? showPassword ? <VisibilityOff/> :
                                                <Visibility/> : null}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                                error={pwdError}
                                helperText={pwdHelper}
                                onBlur={handlePwdOnBlur}
                                value={password}
                                onChange={handlePwdChange}
                            />
                            {/*<FormControl variant='outlined' fullWidth required>
                                <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id='outlined-adornment-password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePwdChange}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge='end'
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label='Password'
                                />
                            </FormControl>*/}
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
