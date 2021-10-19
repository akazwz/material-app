import React from 'react';
import {useAuth} from "../hooks/hooks";
import {Redirect} from "react-router-dom";

const HomePage = () => {
    let authValue = useAuth();
    let to = authValue.auth.token !== 'token' ? '/dashboard' : 'sign-in';

    return (
        <>
            <Redirect to={to}/>
        </>
    );
}

export default HomePage;
