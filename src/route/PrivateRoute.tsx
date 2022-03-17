import React from 'react'
import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = (rest: any) => {
  const isLogin = true
  return isLogin ? (
    <Route {...rest} />
  ) : (
    <Navigate to="/sign-in"/>
  )
}

export default PrivateRoute
