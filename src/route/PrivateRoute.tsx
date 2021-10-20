import React from 'react';
import {useAuth} from "../hooks/hooks";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = (rest: any) => {
    let authValue = useAuth();
    const isLogin = authValue.auth.user.token.length >= 1;
    return isLogin ? (
        <Route {...rest} />
    ) : (
        <Redirect to="/sign-in" />
    );
};

export default PrivateRoute;
