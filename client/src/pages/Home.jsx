import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const {currentUser}=useSelector(state=>state.user)
  return (
  
    <div>
    hello {currentUser?.username}
    </div>
  )
}

export default Home
