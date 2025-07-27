
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { createRoot } from 'react-dom/client'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
        <App />
    </AuthProvider> 
  </BrowserRouter>
)
