import React from 'react';
import Navbar from './Components/Layout/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoute from './Routes/AppRoute';

function App() {
  return (
    <div>
      <ToastContainer />
      <AppRoute/>
    </div>
  );
}

export default App;
