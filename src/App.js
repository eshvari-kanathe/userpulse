// import React from 'react'
// import Navbar from './Components/Layout/Navbar'
// import Login from './Pages/Auth/Login'
// import ForgotPassword from './Pages/Auth/ForgotPassword'
// import ResetPassword from './Pages/Auth/ResetPassword'
// import UserList from './Pages/UserDashboard/UserList'
// import Register from './Pages/Auth/Register'
// import UpdateUser from './Pages/UserDashboard/UpdateUser'
// import { ToastContainer } from 'react-toastify'
// import { Route, Routes } from 'react-router-dom'
// import 'react-toastify/dist/ReactToastify.css';
// import PageNotFound from './Components/System/PageNotFound'
// import ProtectedRoutes from './Routes/PrivateRoutes'

// function App() {
//   return (
//     <div>
//       < ToastContainer />

//       <Navbar />
//       {/* <Routes>
//         <Route path="/" element={<Login />}></Route>
//         <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
//         <Route path="/auth/reset-password/:id/:token" element={<ResetPassword />}></Route>
//         <Route path="/dashboard" element={<UserList />}></Route>
//         <Route path="/register" element={<Register />}></Route>
//         <Route path="/form" element={<UpdateUser />}></Route>
//         <Route path="*" element={<PageNotFound/>}></Route>
//       </Routes> */}
//       <Routes>
//         <Route path="/" element={<Login />}></Route>
//         <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
//         <Route path="/auth/reset-password/:id/:token" element={<ResetPassword />}></Route>
//         <Route path="/register" element={<Register />}></Route>
//         <Route path="*" element={<PageNotFound />}></Route>


//         <Route path='/dashboard' element={<ProtectedRoutes Component={UserList} />}></Route>
//         <Route path='"/form"' element={<ProtectedRoutes Component={UpdateUser} />}></Route>

//       </Routes>
//     </div>
//   )
// }

// export default App



import React from 'react';
import Navbar from './Components/Layout/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoute from './Routes/AppRoute';

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <AppRoute/>
    </div>
  );
}

export default App;
