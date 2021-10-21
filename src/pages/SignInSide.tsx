import React from 'react';
// @ts-ignore
import SwipeableViews from 'react-swipeable-views';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useTheme} from '@mui/material/styles';
import SignInByPhonePwd from '../components/signin/SignInByPhonePwd';
import SignInByPhoneCode from "../components/signin/SignInByPhoneCode";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const SignInSide = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
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
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='secondary'
                    textColor='inherit'
                    variant='fullWidth'
                    aria-label='full width tabs example'
                >
                    <Tab label='Phone Code' {...a11yProps(0)} />
                    <Tab label='Phone Pwd' {...a11yProps(1)} />
                    <Tab label='Username Pwd' {...a11yProps(2)} />
                </Tabs>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <SignInByPhoneCode/>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <SignInByPhonePwd/>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <SignInByPhonePwd/>
                    </TabPanel>
                </SwipeableViews>
            </Grid>
        </Grid>
    );
}

export default SignInSide;
