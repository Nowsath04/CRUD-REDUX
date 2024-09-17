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

function App() {

  useEffect(() => {
    store.dispatch(GetProfile);
  }, []);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={
            <ProtectionRouter>
              <Table />
            </ProtectionRouter>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/edit/:id' element={<EditData />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
