import './App.css'
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './Components/SignupForm'
import LoginForm from './Components/LoginForm'
import ProtectedRoute from './Components/ProtectedRoute';
import ForgotPassword from './Components/ForgotPassword';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
      </Routes>
    </Router>
  )
}

export default App
