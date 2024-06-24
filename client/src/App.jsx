import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import Header from './componenets/Header.jsx'
import PrivateRoute from './componenets/PrivateRoute.jsx'
import Listing from './pages/Listing.jsx'

import CreateListing from './pages/CreateListing.jsx'
import UpdateListing from './pages/UpdateListing.jsx'

function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>

    <Route path='/' element = {<Home/>}/>
    <Route path='/SignIn' element = {<SignIn/>}/>
    <Route path='/SignUp' element = {<SignUp/>}/>
    <Route path='/About' element = {<About/>}/>
   
    <Route element={<PrivateRoute/>}>
    <Route path='/Profile' element = {<Profile/>}/>
    <Route path='/CreateListing' element={<CreateListing/>}/>
    <Route path='/update-Listing/:listingId' element={<UpdateListing/>}/>
    <Route path='/listing/:listingId' element={<Listing />} />

    </Route>
  </Routes>
  
  </BrowserRouter>
}

export default App
