import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {openLoginModal, openRegModal, setLoggedIn} from '../features/modal/modalSlice';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { FaHotel, FaSignOutAlt } from 'react-icons/fa';



export default function Navbar() {
  
  
  const navigate = useNavigate();
  function handleNavigate(){
    navigate('/')
  }
  // console.log('loggedin :'+isLoggedIn);
  const {loggedIn} = useSelector(state=>state.modal);
  const dispatch = useDispatch();
  const [isLoggedIn,setIsLoggedIn] = React.useState(loggedIn)


  React.useEffect(()=>{
    setIsLoggedIn(loggedIn)
    //localStorage.setItem('isLoggedIn', loggedIn)
  },[loggedIn])
  
  console.log('isLoggedIn is '+isLoggedIn);
  return (
    <div className='nav-bar'>
        <h1 onClick={handleNavigate}>EliteBooking</h1>
        {!isLoggedIn&&<div className='btns-container'>
          <button className='btn login' onClick={()=>dispatch(openLoginModal())}>Login</button>
          <button className='btn signup' onClick={()=>dispatch(openRegModal())}>Sign up</button>
        </div>}
        {isLoggedIn&&<div className='btns-container'>
          <button className='btn login' onClick={()=>{
            handleNavigate();
            let isLoggedIn = false;
            localStorage.setItem('isLoggedIn', 'false');
            dispatch(setLoggedIn({isLoggedIn}))}}><FaSignOutAlt />Logout</button>
          <button className='btn signup' onClick={()=>navigate('/bookings')}><FaHotel />Bookings</button>
          
        </div>}
        
    </div>
  )
}
