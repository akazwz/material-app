import React, {useEffect, useState} from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Copyright from '../components/Copyright';
import {signIn, AxiosResponse} from '../api/api';
import {useAppDispatch} from '../hooks/hooks';
import {setExpiredAt, setToken} from '../redux/auth';

const SignInSide = () => {
    let history = useHistory();
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneHelper, setPhoneHelper] = useState('');
    const [pwdError, setPwdError] = useState(false);
    const [password, setPassword] = useState('');
    const [pwdHelper, setPwdHelper] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitDisabled, setSummitDisabled] = useState(true);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState('account');

    useEffect(() => {
        if (!phoneError && !pwdError && phone.length === 11 && password.length >= 8) {
            setSummitDisabled(false);
        }
    }, [pwdError, password, phone, phoneError]);

    // login
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handlePhoneOnBlur();
        handlePwdOnBlur();
        setLoading(true);
        const dataFormData = new FormData(event.currentTarget);
        const dataJson = {
            username: dataFormData.get('phone'),
            password: dataFormData.get('password'),
        }
        signIn(dataJson)
            .then((res: AxiosResponse) => {
                if (res?.status !== 201) {
                    setLoading(false);
                    setAlertType('account');
                    setAlertOpen(true);
                    return;
                }
                console.log(res);
                const {code, data} = res?.data;
                const {expires_at, token, user} = data;
                const {header_img, nick_name, username, authority_id} = user;
                if (code !== 2000) {
                    setLoading(false);
                    setAlertType('account');
                    setAlertOpen(true);
                    return;
                }
                localStorage.setItem('expires_at', expires_at);
                localStorage.setItem('token', token);
                dispatch(setToken(token));
                dispatch(setExpiredAt(expires_at));
                setLoading(false);
                history.push('/dashboard');
            })
            .catch((err: any) => {
                const {code} = err.response.data;
                if (code === 4003) {
                    setAlertType('account');
                    setAlertOpen(true);
                } else {
                    setAlertType('net');
                    setAlertOpen(true);
                }
                setLoading(false);
            })
    };

    // phone on blur
    const handlePhoneOnBlur = () => {
        let reg = /^1[3456789]\d{9}$/;
        if (phone === '') {
            setPhoneError(true);
            setPhoneHelper(t('signInSide.phoneHelperNull'));
            return;
        }
        if (reg.test(phone)) {
            setPhoneHelper('');
            setPhoneError(false);
        } else {
            setPhoneError(true);
            setPhoneHelper(t('signInSide.phoneHelperRight'));
        }
    }

    // phone value control
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
            setPhoneHelper(t('signInSide.phoneHelperNumber'));
        }
    }

    // password control
    const handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        if (value.length < 30) {
            setPwdError(false);
            setPwdHelper('');
            setPassword(value);
        }
    }

    // password on blur
    const handlePwdOnBlur = () => {
        const patternPwd = /^.*([0-9])+.*$/i;
        if (password === '') {
            setPwdError(true);
            setPwdHelper(t('signInSide.pwdHelperNull'));
            return;
        }
        if (password.length < 6) {
            setPwdError(true);
            setPwdHelper(t('signInSide.pwdHelperLength'));
            return;
        }
        if (patternPwd.test(password)) {
            setPwdError(false);
            setPwdHelper('');
        } else {
            setPwdError(true);
            setPwdHelper(t('signInSide.pwdHelperPattern'));
        }
    }

    // toggle show password
    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const GridImg = (props: any) => {
        return (
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(' + props.url + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
        );
    }

    return (
        <Grid container component='main' sx={{height: '100vh'}}>

            <CssBaseline/>
            {/*side image*/}
            <GridImg url='https://source.unsplash.com/random'/>
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
                    <Collapse in={alertOpen}>
                        <Alert
                            severity='error'
                            action={
                                <IconButton
                                    aria-label='close'
                                    color='inherit'
                                    size='small'
                                    onClick={() => {
                                        setAlertOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize='inherit'/>
                                </IconButton>
                            }
                            sx={{mb: 2}}
                        >
                            {alertType === 'account' ? t('signInSide.accountError') : t('signInSide.netError')}
                        </Alert>
                    </Collapse>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        {t('signInSide.signIn')}
                    </Typography>
                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='phone'
                            label={t('signInSide.phoneNumber')}
                            name='phone'
                            autoComplete='off'
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
                            label={t('signInSide.password')}
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            autoComplete='off'
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleToggleShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {password.length > 1 ? showPassword ? <VisibilityOff/> :
                                            <VisibilityIcon/> : null}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                            error={pwdError}
                            helperText={pwdHelper}
                            onBlur={handlePwdOnBlur}
                            value={password}
                            onChange={handlePwdChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value='remember' color='primary'/>}
                            label={t('signInSide.rememberMe')}
                        />
                        <LoadingButton
                            type='submit'
                            fullWidth
                            variant='contained'
                            loading={loading}
                            loadingIndicator={<CircularProgress size={27}/>}
                            sx={{mt: 3, mb: 2}}
                            disabled={submitDisabled}
                        >
                            {t('signInSide.signInBtn')}
                        </LoadingButton>
                        <Grid container>
                            <Grid item xs>
                                <Link href='#' variant='body2'>
                                    {t('signInSide.forgotPwd')}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href='#' variant='body2'>
                                    {t('signInSide.toSignUp')}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{mt: 5}}/>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default SignInSide;
