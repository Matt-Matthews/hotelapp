import React from 'react';
import {FaEyeSlash, FaEye} from "react-icons/fa";
import {useDispatch} from 'react-redux';
import {closeRegModal, openLoginModal} from '../features/modal/modalSlice';

export default function Register() {
    const dispatch = useDispatch();
    const [isObscured, setObscure] = React.useState(true);
    const [isConfObscured, setConfObscure] = React.useState(true);
    function obscure() {
        setObscure(prevObs => {return !prevObs})
    }
    function obscureConf() {
        setConfObscure(prevObs => {return !prevObs})
    }
  return (
    <div className='form-container'>
        <div className='form reg'>
            <h2>Register</h2>
            <div className='input-container'>
                <input type='text' placeholder='firstname' />
            </div>
            <div className='input-container'>
                <input type='text' placeholder='lastname' />
            </div>
            <div className='input-container'>
                <input type='email' placeholder='email' />
            </div>
            <div className='input-container'>
                <input type='tel' placeholder='mobile number' />
            </div>
            <div className='input-container'>
                <input type= {isObscured?'password': 'text' } placeholder='create password' />
                <div className='icon eye' onClick={obscure}>
                    {isObscured?<FaEyeSlash />:<FaEye />}
                </div>
                
            </div>
            <div className='input-container'>
                <input type= {isConfObscured?'password': 'text' } placeholder='confirm password' />
                <div className='icon eye' onClick={obscureConf}>
                    {isConfObscured?<FaEyeSlash />:<FaEye />}
                </div>
                
            </div>
            <div className='sizedBox'></div>
            <button className='btn signup' onClick={()=>dispatch(closeRegModal())}>Register</button>
            
            <button className='noAccount' onClick={()=>{
                dispatch(closeRegModal());
                dispatch(openLoginModal())
                }}>Already have an account?</button>
        </div>
    </div>
  )
}

