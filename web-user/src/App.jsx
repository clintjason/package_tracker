import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './components/Register/Register.component';
import SignIn from './components/Login/Login.component';
import NotFound404 from './components/NotFound/NotFound404.component';

import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  )
}

export default App
