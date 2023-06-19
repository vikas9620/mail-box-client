

import './App.css';
import SignUp from './components/auth/signup/SignUp';
import { Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/auth/login/Login';
import MainPage from './components/mainPage/MainPage';
import { Fragment } from 'react';
function App() {
  return ( 
    <Fragment>
    <Outlet />
   <Routes>
   
   <Route path='/' element={<MainPage/>} exact></Route>
   <Route path='/signup' element={<SignUp/>}></Route> 
   <Route path='/login' element={<Login/>}></Route>
   
   </Routes>
   </Fragment>
   
  );
}

export default App;
