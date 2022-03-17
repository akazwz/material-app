import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './i18n'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import SignInSide from './pages/SignInSide'
import SignUp from './pages/SignUp'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
