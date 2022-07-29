import React from 'react';
import {FaEyeSlash, FaEye} from "react-icons/fa";
import {useDispatch} from 'react-redux';
import {closeLoginModal, openRegModal, setLoggedIn} from '../features/modal/modalSlice';
import {auth, firestore} from '../config/firebase'
import {signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import {collection, getDocs } from 'firebase/firestore';

export default function Login() {
    const dispatch = useDispatch();
    const [isObscured, setObscure] = React.useState(true);
    const [isEmpty, setIsEmpty] =  React.useState(false);
    const [userData,setUserData] = React.useState({
        email: '',
        password: ''
    });
    const [user,setUser] = React.useState([]);
    const [isResetModal,setIsResetModal] = React.useState(false)
    function obscure() {
        setObscure(prevObs => {return !prevObs})
    }

    function handleUserData(e){
        const {name, value} = e.target;

        setUserData(prevData=>{
            return{...prevData, [name]:value}
        })
    }

    

    function handleSubmit(){
        setIsEmpty(true);
        
        if(userData.email&&userData.password){
            localStorage.setItem('isLoggedIn',true);
            let users =  [];
            // dispatch(closeLoginModal());
            signInWithEmailAndPassword(auth, userData.email, userData.password).then((result)=>{
                const collectionRef = collection(firestore, 'Users');
                localStorage.setItem('userId',result.user.uid);
                
                getDocs(collectionRef).then((snapshot)=>snapshot.docs.map(doc=>{
                   
                    return users.push(doc.data());
                }))
                
                // let user = users.filter((u)=>u.userID === result.user.uid);
                
                
                // let initials = user[0].name + user[0].surname;
                localStorage.setItem('isLoggedIn',true);
                // localStorage.setItem('initials',initials);
                const isLoggedIn = true;
                dispatch(closeLoginModal());
                dispatch(setLoggedIn({isLoggedIn}))
                alert('Successfully logged in')
                
            }).catch((e) =>{
                alert(e.message)
            })
            setUser(users)
         
        }
       
    }



    const [resetEmail, setResetEmail] = React.useState('')
    function handleReset(){
        sendPasswordResetEmail(auth,resetEmail);
    }

  return (
    <div className='form-container'>
        
        <div className='form'>
        <button className='closeBtn' onClick={()=>dispatch(closeLoginModal())}>close</button>
            <h2>{!isResetModal?'Login': 'Reset'}</h2>
            {!isResetModal&&<div className='input-container'>
                <input type='email' placeholder='email' value={userData.email} name='email' onChange={(e)=>handleUserData(e)} />
                <span hidden={isEmpty?userData.email !== '':!isEmpty}>Email required*</span>
            </div>}
            {!isResetModal&&<div className='input-container'>
                <input type= {isObscured?'password': 'text' } value={userData.password} name='password' onChange={(e)=>handleUserData(e)}  placeholder='password' />
                <div className='icon eye' onClick={obscure}>
                    {isObscured?<FaEyeSlash />:<FaEye />}
                </div>
                <span hidden={isEmpty?userData.password !=='':!isEmpty}>password required*</span>
                
            </div>}
            {isResetModal&&<div className='input-container resetModal'>
            <input type='email' value={resetEmail} onChange={(e)=>setResetEmail(e.target.value)} placeholder='email' name='resetEmail' />
                </div>}
            <div onClick={()=>setIsResetModal(!isResetModal)} className='fpBtn'>
                {!isResetModal?'Forgot password?':'Login'}
            </div>
            
            <button className='btn signup' onClick={()=>!isResetModal?handleSubmit():handleReset()}>{!isResetModal?'Login': 'Reset'}</button>
            
            {!isResetModal&&<button className='noAccount' onClick={()=>{
                dispatch(closeLoginModal());
                dispatch(openRegModal())
                }}>Don`t have an account?</button>}
        </div>
    </div>
  )
}
