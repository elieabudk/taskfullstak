import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { CrearTarea } from './features/dashboard/CrearTarea'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './features/auth/LoginPage'
import { RegisterPage } from './features/auth/RegisterPage'
import { Dashboard } from './features/dashboard/dashboard'
function App() {
  

  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/crear-tarea" element={<CrearTarea />} />
    </Routes>
    </>
  )
}

export default App
