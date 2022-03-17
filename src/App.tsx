import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop/Backdrop'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import SignInSide from './pages/SignInSide'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <Suspense fallback={
      <Backdrop
        open={true}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
    }>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/sign-in" element={<SignInSide/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
      </Routes>
    </Suspense>
  )
}

export default App

