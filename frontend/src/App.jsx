import './App.css'
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './Components/SignupForm'
import LoginForm from './Components/LoginFrom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  )
}

export default App
