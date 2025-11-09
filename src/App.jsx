import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Signin from './pages/Auth/Signin'
import SignUp from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard'
import PasswordReset from './pages/Auth/PasswordReset'
import Navbar from './pages/Navbar'
import Rankings from './pages/Dashboard-Components/Rankings'
import Footer from './pages/Footer'
import LinkedAccounts from './pages/Dashboard-Components/LinkedAccounts'
import Compete from './pages/Dashboard-Components/Compete'
import CreateContest from './pages/Compete/CreateContest'
import JoinContest from './pages/Compete/JoinContest'
import ContestRoom from './pages/Compete/ContestRoom'
import ResultScreen from './pages/Compete/ResultScreen'

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
      <Route path="/LinkedAccounts" element={user? <LinkedAccounts /> : <Navigate to={"/signin"}/>} />
      <Route path="/Compete" element={user? <Compete /> : <Navigate to={"/signin"}/>} />
      <Route path="/signin" element={!user ? <Signin /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/PasswordReset" element={<PasswordReset />}/>
      <Route path="/SignUp" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
      <Route path="/Home" element={!user ? <SignUp /> : <Navigate to="/dashboard" />} />
      <Route path="/Rankings" element={user ? <Rankings /> : <Navigate to="/signin" />} />
      {/* // In your main App.jsx or routing file */}
      <Route path="/compete" element={<Compete />} />
      <Route path="/compete/create" element={<CreateContest />} />
      <Route path="/compete/join" element={<JoinContest />} />
      <Route path="/compete/room/:inviteCode" element={<ContestRoom />} />
    </Routes>
    <Footer></Footer>
    </>
  )
}

export default App
