import React from 'react';
import {FaEyeSlash, FaEye} from "react-icons/fa";
import {useDispatch} from 'react-redux';
import {closeLoginModal, openRegModal} from '../features/modal/modalSlice';

export default function Login() {
    const dispatch = useDispatch();
    const [isObscured, setObscure] = React.useState(true);
    function obscure() {
        setObscure(prevObs => {return !prevObs})
    }
  return (
    <div className='form-container'>
        <div className='form'>
            <h2>Login</h2>
            <div className='input-container'>
                <input type='email' placeholder='email' />
            </div>
            <div className='input-container'>
                <input type= {isObscured?'password': 'text' } placeholder='password' />
                <div className='icon eye' onClick={obscure}>
                    {isObscured?<FaEyeSlash />:<FaEye />}
                </div>
                
            </div>
            <div className='fpBtn'>
                Forgot password?
            </div>
            
            <button className='btn signup' onClick={()=>dispatch(closeLoginModal())}>Login</button>
            
            <button className='noAccount' onClick={()=>{
                dispatch(closeLoginModal());
                dispatch(openRegModal())
                }}>Don`t have an account?</button>
        </div>
    </div>
  )
}
