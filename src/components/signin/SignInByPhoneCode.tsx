import React, {useEffect, useState} from 'react';
import {Link as RouterLink, useHistory} from "react-router-dom";
import {useAppDispatch} from "../../hooks/hooks";
import {useTranslation} from "react-i18next";
import {AxiosResponse, createUser, getVerificationCode, signInByPhonePwd} from "../../api/api";
import {setUser, UserI} from "../../redux/auth";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Copyright from "../Copyright";
import Button from "@mui/material/Button";

const SignInByPhoneCode = () => {
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
    const [btnValue, setBtnValue] = useState('get code');
    const [time, setTime] = useState(60);
    const [codeBtnDisabled, setCodeBtnDisabled] = useState(false);

    // count down
    useEffect(() => {
        let timer: any;
        if (time > 0 && time < 60) {
            timer = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
            setCodeBtnDisabled(true);
            setBtnValue(`${time} seconds resend`);
        } else {
            setCodeBtnDisabled(false);
            setTime(60);
            setBtnValue('Get Code');
        }
        return () => {
            clearTimeout(timer);
        };
    }, [time]);

    const handleGetCodeClick = () => {
        let reg = /^1[3456789]\d{9}$/;
        if (phone === '') {
            alert('phone error');
            return;
        }
        if (!reg.test(phone)) {
            alert('phone error reg');
            return;
        }
        getVerificationCode(phone)
            .then((res) => {
                console.log(res);
                if (res.status !== 200) {
                    alert('send sms error');
                    return;
                }
                const {code} = res.data;
                if (code !== 2000) {
                    alert('send sms error');
                    return;
                }
                setTime(59);
            })
            .catch((err) => {
                console.log(err);
                alert('send sms error');
                return;
            });
    }

    useEffect(() => {
        if (!phoneError && !pwdError && phone.length === 11 && password.length >= 8) {
            setSummitDisabled(false);
        }
    }, [pwdError, password, phone, phoneError]);

    // login
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handlePhoneOnBlur();
        setLoading(true);
        const dataFormData = new FormData(event.currentTarget);
        const dataJson = {
            phone: dataFormData.get('phone'),
            password: dataFormData.get('password'),
        }
        signInByPhonePwd(dataJson)
            .then((res: AxiosResponse) => {
                if (res.status !== 201) {
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
                let userLocal: UserI;
                userLocal = {
                    headerImg: header_img,
                    nickname: nick_name,
                    username: username,
                    authorityId: authority_id,
                    token: token,
                    expiredAt: expires_at,
                }
                localStorage.setItem('user', JSON.stringify(userLocal));
                dispatch(setUser(userLocal));
                setLoading(false);
                history.push('/dashboard');
            })
            .catch((err: any) => {
                if (err.response !== undefined) {
                    const {code} = err.response?.data;
                    if (code === 4003) {
                        setAlertType('account');
                        setAlertOpen(true);
                    }
                } else {
                    setAlertType('net');
                    setAlertOpen(true);
                }
                setLoading(false);
            });
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

    return (
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
                    required
                    fullWidth
                    id='code'
                    label='Verification Code'
                    name='code'
                    autoComplete='off'
                />
                <Button
                    fullWidth
                    disabled={codeBtnDisabled}
                    size='large'
                    variant='outlined'
                    sx={{
                        height: '100%'
                    }}
                    onClick={handleGetCodeClick}
                >
                    {btnValue}
                </Button>
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
                        <Link component={RouterLink} to='/#'>
                            {t('signInSide.forgotPwd')}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link component={RouterLink} to='/sign-up'>
                            {t('signInSide.toSignUp')}
                        </Link>
                    </Grid>
                </Grid>
                <Copyright sx={{mt: 5}}/>
            </Box>
        </Box>
    );

}

export default SignInByPhoneCode;
