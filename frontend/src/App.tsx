"use client"

import HomePage from "./pages/Home"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Header from "./components/header/header"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"

const App = () => {
  return (
    <div className="bg-[#181717] m-h-screen text-white">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App