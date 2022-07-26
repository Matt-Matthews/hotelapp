import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import {useDispatch} from 'react-redux';
import {openLoginModal,openRegModal} from '../features/modal/modalSlice';

export default function Footer() {
  const dispatch = useDispatch();
  
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
        <div className='btns-container'>
            <button className='btn login'
            onClick={()=>{dispatch(openLoginModal()); window.scrollTo(0, 0)}}
            >Login</button>
            <button className='btn signup' onClick={()=>{dispatch(openRegModal());}}>Sign up</button>
        </div>
    </div>
  )
}
