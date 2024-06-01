import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import Header from './componenets/Header.jsx'

function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>

    <Route path='/' element = {<Home/>}/>
    <Route path='/SignIn' element = {<SignIn/>}/>
    <Route path='/SignUp' element = {<SignUp/>}/>
    <Route path='/About' element = {<About/>}/>
    <Route path='/Profile' element = {<Profile/>}/>
   
    
  </Routes>
  
  </BrowserRouter>
}

export default App
