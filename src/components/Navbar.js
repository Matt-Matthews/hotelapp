import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {openLoginModal, openRegModal} from '../features/modal/modalSlice';

export default function Navbar() {
  
  const navigate = useNavigate();
  function handleNavigate(){
    navigate('/')
  }
  const dispatch = useDispatch();
  return (
    <div className='nav-bar'>
        <h1 onClick={handleNavigate}>EliteBooking</h1>
        <div className='btns-container'>
            <button className='btn login' onClick={()=>dispatch(openLoginModal())}>Login</button>
            <button className='btn signup' onClick={()=>dispatch(openRegModal())}>Sign up</button>
        </div>
    </div>
  )
}
