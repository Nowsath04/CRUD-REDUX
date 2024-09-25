import './App.css'
import Table from './Table/Table'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Login/Login';
import Register from './Register/Register';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import store from './store';
import { GetProfile } from './Actions/userAction';
import ProtectionRouter from './ProtectionRouter/ProtectionRouter';
import EditData from './EditData/EditData';
import Forgot from './ForgotPass/Forgot';
import ResetPass from './ResetPass/ResetPass';
import Animation from './Animation/Animation';

function App() {

  useEffect(() => {
    store.dispatch(GetProfile);
  }, []);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/table' element={
            <ProtectionRouter>
              <Table />
            </ProtectionRouter>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<Forgot />} />
          <Route path='/reset-password/:id/:token' element={<ResetPass />} />
          <Route path='/edit/:id' element={<EditData />} />
          <Route path='/' element={<Animation />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
