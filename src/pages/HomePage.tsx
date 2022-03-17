import React from 'react'
import { Navigate } from 'react-router-dom'

const HomePage = () => {
  let authed = true
  let to = authed ? '/dashboard' : '/sign-in'

  return (<Navigate to={to}/>)
}

export default HomePage
