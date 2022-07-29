import React from 'react';
import {FaEyeSlash, FaEye} from "react-icons/fa";
import {useDispatch} from 'react-redux';
import {closeRegModal, openLoginModal} from '../features/modal/modalSlice';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {collection, addDoc} from 'firebase/firestore';
import {auth, firestore} from '../config/firebase';

export default function Register() {
    const dispatch = useDispatch();
    const [isObscured, setObscure] = React.useState(true);
    const [isConfObscured, setConfObscure] = React.useState(true);
    const [isEmpty, setIsEmpty] =  React.useState(false);
    const [userData,setUserData] = React.useState({
        email: '',
        password: '',
        firstName:'',
        lastName:'',
        mobileNumber:'',
        confirmPassword:'',
        tsNCs: false,
        promo:false

    });
    function obscure() {
        setObscure(prevObs => {return !prevObs})
    }
    function obscureConf() {
        setConfObscure(prevObs => {return !prevObs})
    }

    function handleUserData(e){
        const {name, value, checked, type} = e.target;

        setUserData(prevData=>{
            return{...prevData, [name]: type==='checkbox'?checked:value }
        })

      
       
    }

    function handleSubmit(){

        

        setIsEmpty(true);
        if(userData.email&&userData.password&&
            userData.mobileNumber&&userData.firstName&&
            userData.lastName&&userData.confirmPassword&&
            userData.tsNCs&&
            userData.password===userData.confirmPassword){

                createUserWithEmailAndPassword(auth, userData.email, userData.password).then((result)=>{

                    const collectionRef = collection(firestore, 'Users')
                    addDoc(collectionRef,{
                      email: userData.email, 
                      name: userData.firstName, 
                      surname: userData.lastName,
                      tsNCs:userData.tsNCs,
                      promo: userData.promo, 
                      userID: result.user.uid
                    }).then(()=>{
                        dispatch(closeRegModal())
                        alert('Successfully registered')
                    }).catch((e)=>{
                      alert(e.message)
                    })
            
                  }).catch((e) =>{
                    alert(e.message)
                  })
            
        }else if(!userData.tsNCs){
            alert('Accept the terms and conditions')
        }
       
    }

  return (
    <div className='form-container'>
        <div className='form reg'>
        <button className='closeBtn' onClick={()=>dispatch(closeRegModal())}>close</button>
            <h2>Register</h2>
            <div className='input-container'>
                <input type='text' 
                        placeholder='firstname' 
                        value={userData.firstName}
                        name='firstName'
                        onChange={(e)=>handleUserData(e)}
                        />
                <span hidden={isEmpty?userData.firstName !== '':!isEmpty}>Firstname is required*</span>
            </div>
            <div className='input-container'>
                <input type='text' 
                        placeholder='lastname' 
                        value={userData.lastName}
                        name='lastName' 
                        onChange={(e)=>handleUserData(e)}
                        />
                <span hidden={isEmpty?userData.lastName !== '':!isEmpty}>Lastname is required*</span>
            </div>
            <div className='input-container'>
                <input type='email' 
                        placeholder='email' 
                        value={userData.email} 
                        name='email'
                        onChange={(e)=>handleUserData(e)}
                        />
                <span hidden={isEmpty?userData.email !== '':!isEmpty}>Email is required*</span>
            </div>
            <div className='input-container'>
                <input type='tel' 
                        placeholder='mobile number' 
                        value={userData.mobileNumber}
                        name='mobileNumber' 
                        onChange={(e)=>handleUserData(e)}
                        />
                <span hidden={isEmpty?userData.mobileNumber !== '':!isEmpty}>Mobile numer is required*</span>
            </div>
            <div className='input-container'>
                <input type= {isObscured?'password': 'text' } 
                        value={userData.password} 
                        placeholder='create password' 
                        name='password'
                        onChange={(e)=>handleUserData(e)}
                        />
                    <span hidden={isEmpty?userData.password !== '':!isEmpty}>Password is required*</span>
                <div className='icon eye' onClick={obscure}>
                    {isObscured?<FaEyeSlash />:<FaEye />}
                </div>
                
            </div>
            <div className='input-container'>
                <input type= {isConfObscured?'password': 'text' } 
                        value={userData.confirmPassword} 
                        placeholder='confirm password' 
                        name='confirmPassword'
                        onChange={(e)=>handleUserData(e)}
                        />
                    <span hidden={isEmpty?userData.confirmPassword !== '':!isEmpty}>Confirm password is required*</span>
                <div className='icon eye' onClick={obscureConf}>
                    {isConfObscured?<FaEyeSlash />:<FaEye />}
                </div>
                
            </div>
            <div className='check'>
            <input type='checkbox' id='terms' name='tsNCs' checked={userData.tsNCs} onChange={(e)=>handleUserData(e)} /> 
            I agree to the <button>Terms</button> <span>and</span>  <button>Conditions</button>.
            </div>
       
            <div className='check'>
            <input type='checkbox' id='terms' name='promo' checked={userData.promo} onChange={(e)=>handleUserData(e)} /> 
            I agree to recieve promotional emails.
            </div>
            <div className='sizedBox'></div>
            <button className='btn signup' onClick={()=>handleSubmit()}>Register</button>
            
            <button className='noAccount' onClick={()=>{
                dispatch(closeRegModal());
                dispatch(openLoginModal())
                }}>Already have an account?</button>
        </div>
    </div>
  )
}

