import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css'

import CreatePackage from './components/CreatePackage';
import CreateDelivery from './components/CreateDelivery';
import PackageTable from './components/PackageTable';
import DeliveryTable from './components/DeliveryTable';
import NotFound from './components/NotFound/NotFound404.component';
import Home from './components/Home';

function App() {
  const loginData = useSelector((state) => state.user);

  /* function getAuthenticatedUser() {
    fetch('http://localhost:5000/api/v1/auth/', {
        method: 'GET',
        credentials: 'include', // Important for including HTTP-only cookies
    })
    .then(response => response.json())
    .then(user => {
        // Use user data
        console.log(user);
    });
  } */

  useEffect(() => {
    if (loginData) {
      // Use the login data in this microfrontend
      console.log("in the web admin")
      console.log(loginData);
    }
  }, [loginData]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-package" element={<CreatePackage />} />
        <Route path="/create-delivery" element={<CreateDelivery />} />
        <Route path="/list-packages" element={<PackageTable />} />
        <Route path="/list-deliveries" element={<DeliveryTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
