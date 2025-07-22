import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StarSearchbar from './Components/StarSearchbar'


function App() {

  return (
    <>
      <h1>Welcome to StarTrack</h1>
      <h4>Use the search bar below to find information about a star.</h4>
      <StarSearchbar></StarSearchbar>
    </>
  )
}

export default App
