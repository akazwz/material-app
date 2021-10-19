import React from 'react';
import {useAuth} from "../hooks/hooks";
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = (rest: any, children: ChildNode) => {
    let authValue = useAuth();
    return (
        <Route
            {...rest}
            render={authValue.auth.token ? (
                children
            ) : (
                <Redirect to="/sign-in" />
            )}
        />
    );
};

export default PrivateRoute;
