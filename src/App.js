

import './App.css';
import SignUp from './components/auth/signup/SignUp';
import { Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/auth/login/Login';
import MainPage from './components/mainPage/MainPage';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
function App() {
 const isLogin = useSelector(state=> state.auth.isLoggedIn)
 console.log(isLogin)
  return ( 
    <Fragment>
    <Outlet />
   <Routes>
   
 {isLogin && <Route path='/' element={<MainPage/>} exact></Route>}
 <Route path='/signup' element={<SignUp/>}></Route> 
   <Route path='/login' element={<Login/>}></Route>
   <Route path="*" element={<Navigate replace to="/login" />} />
   </Routes>
   </Fragment>
   
  );
}

export default App;
