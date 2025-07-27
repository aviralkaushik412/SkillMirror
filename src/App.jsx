import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Signin from './pages/Auth/Signin'
import SignUp from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard'
import PasswordReset from './pages/Auth/PasswordReset'
import Navbar from './pages/Navbar'

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>

    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={!user? <Home /> : <Navigate to={"/Home"}/>} />
      <Route path="/signin" element={!user ? <Signin /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/PasswordReset" element={<PasswordReset />}/>
      <Route path="/SignUp" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
      <Route path="/Home" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
    </Routes>


    </>
  )
}

export default App
