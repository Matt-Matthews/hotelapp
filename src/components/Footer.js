import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import {openLoginModal,openRegModal, setLoggedIn} from '../features/modal/modalSlice';
import { FaHotel, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const dispatch = useDispatch();
  const {loggedIn} = useSelector(state=>state.modal);
  const [isLoggedIn,setIsLoggedIn] = React.useState(loggedIn)


  React.useEffect(()=>{
    setIsLoggedIn(loggedIn)
    //localStorage.setItem('isLoggedIn', loggedIn)
  },[loggedIn])
  const navigate = useNavigate();
  function handleNavigate(){
    navigate('/')
  }
  
  return (
    <div className='footer'>
        <div className='socials'>
            <div className='social-container'>
              <FaFacebookF />
            </div>
            <div className='social-container'>
              <FaTwitter />
            </div>
            <div className='social-container'>
              <FaInstagram />
            </div>
        </div>
        <p>Copyrights@2022</p>
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
