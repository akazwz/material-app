import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Copyright from '../components/Copyright';
import {createUser, getVerificationCode} from "../api/api";

const SignUp = () => {
    const history = useHistory();
    const [btnValue, setBtnValue] = useState('get code');
    const [time, setTime] = useState(60);
    const [codeBtnDisabled, setCodeBtnDisabled] = useState(false);
    const [phone, setPhone] = useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console

        const dataSend = {
            username: data.get('username'),
            phone: data.get('phone'),
            verification_code: data.get('code'),
            password: data.get('password'),
        };

        createUser(dataSend)
            .then((res) => {
                console.log(res);
                if (res.status !== 201) {
                    alert("sign up error");
                    return;
                }
                const {code} = res.data;
                if (code !== 2000) {
                    alert("sign up error");
                    return;
                }
                history.push('/sign-in');
            })
            .catch((err) => {
                console.log(err);
                if (err.response !== undefined) {
                    const {code} = err.response.data;
                    if (code === 4009) {
                        alert('code error');
                    }
                    if (code === 4010) {
                        alert('phone already exists');
                    }
                }
            });
    };

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

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete='off'
                                name='username'
                                required
                                fullWidth
                                id='username'
                                label='Username'
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='phone'
                                label='Phone Number'
                                name='phone'
                                autoComplete='tel'
                                value={phone}
                                onChange={(event) => {
                                    setPhone(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                id='code'
                                label='Verification Code'
                                name='code'
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='new-password'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value='allowExtraEmails' color='primary'/>}
                                label='I want to receive inspiration, marketing promotions and updates via email.'
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link component={RouterLink} to='/sign-in'>
                                go to sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 5}}/>
        </Container>
    );
}

export default SignUp;
