//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import CreatePackage from './components/CreatePackage';
import NotFound from './components/NotFound';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePackage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
