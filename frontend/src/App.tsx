"use client"

import HomePage from "./pages/Home"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Header from "./components/header/header"

const App = () => {
  return (
    <div className="bg-[#181717] m-h-screen text-white">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App