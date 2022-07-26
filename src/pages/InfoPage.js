import React from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import './InfoPage.css';
import {useSelector} from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';
// import { useParams } from 'react-router-dom';
import Ratings from '../components/Ratings';
import Map from '../components/Map';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {openLoginModal, setLoggedIn} from '../features/modal/modalSlice';
import {getTotalPrice,getRoomType,getCheckinDate,getCheckoutDate,getNumAdults,getNumChild,getMealsType, calculateTotalPrice} from '../features/booking/bookingSlicer';
import meals from '../backend/meals';
import {collection, addDoc} from 'firebase/firestore';
import {firestore} from '../config/firebase';

export default function InfoPage() {
  const {isLoginOpen,isRegOpen} = useSelector((state) => state.modal);
  const {totalPrice,roomType,numAdults,numChild,checkinDate,checkoutDate,mealsType,maxAdults} = useSelector(state=>state.booking);
  // const {myData} = useSelector(state=>state.booking);
  // let params = useParams();
  let hotelData = JSON.parse(localStorage.getItem('data'));
console.log(hotelData.price);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  var minDate = new Date().toJSON().slice(0,10);

  
  
    React.useEffect(()=>{
      
      let price = hotelData.price;
    dispatch(getTotalPrice({price}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
 
    const {loggedIn} = useSelector(state=>state.modal);
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = React.useState(loggedIn);
  const [numOfAdults, setNumOfAdults] = React.useState(numAdults);
  const [numOfChild, setNumOfChild] = React.useState(numChild);
  const [numOfDays, setNumOfDays] = React.useState(0);
  const [currentDate, setCurrentDate] = React.useState(checkinDate);
  const [selectedMeal, setSelectedMeal] = React.useState(mealsType);

    React.useEffect(()=>{
      setIsLoggedIn(loggedIn)
    },[loggedIn])


  React.useEffect(()=>{
    var diffTime = new Date(checkoutDate) - new Date(currentDate);
    var diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    console.log(diffDays + ' days');
    let price = 0;
    if(diffDays > 0){

      price = 50 * diffDays
      setNumOfDays(diffDays);
      setCurrentDate(checkoutDate);

    }else if(diffDays < numOfDays){
      price = 50 * diffDays;
      setNumOfDays(-diffDays);
      setCurrentDate(checkoutDate);
    }
    dispatch(calculateTotalPrice({price}));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[checkoutDate,checkinDate,dispatch]);


  React.useEffect(()=>{

    if(!localStorage.getItem('isLoggedIn')){
        localStorage.setItem('isLoggedIn','false');
    }else if(localStorage.getItem('isLoggedIn') === 'true'){
        let isLoggedIn = true;
        dispatch(setLoggedIn({isLoggedIn}))
    }
  
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  
  function handleInput(event){
    if(event.target.name === 'roomtype'){
      let roomType = event.target.value;
      dispatch(getRoomType({roomType}))
      if(roomType==='Single'&& totalPrice > hotelData.price){
        let price;
        if(numAdults ==="4"){ 
          price = -160;
        }else if(numAdults ==="3"){
          price = -130;
        }else{
          price = -100;
        }
        dispatch(calculateTotalPrice({price}))
      }else if(roomType==='Double'){
        let price = 100;
        dispatch(calculateTotalPrice({price}))
      }
    }
    if(event.target.name ==='adult'){
      let numAdults = event.target.value;
      dispatch(getNumAdults({numAdults}))
      let price;
      if(numAdults > numOfAdults){
        price = 30;
        dispatch(calculateTotalPrice({price}));
        setNumOfAdults(numAdults);
      }else if(numOfAdults > 1 && numAdults <= numOfAdults){
        price = -30;
          dispatch(calculateTotalPrice({price}));
          setNumOfAdults(numAdults);
      }
      
    }
    if(event.target.name ==='child'){
      let numChild = event.target.value;
      dispatch(getNumChild({numChild}));
      let price;
      if(numChild > numOfChild){
        price = 15;
        dispatch(calculateTotalPrice({price}));
        setNumOfChild(numChild);
      }else if(numOfChild > 0 && numChild <= numOfChild){
        price = -15;
          dispatch(calculateTotalPrice({price}));
          setNumOfChild(numChild);
      }
    }
    if(event.target.name ==='checkin'){
      let checkinDate = event.target.value;
      dispatch(getCheckinDate({checkinDate}))
    }
    if(event.target.name ==='checkout'){
      let checkoutDate = event.target.value;
      dispatch(getCheckoutDate({checkoutDate}));
      // calculateNumDays();
    }
    if(event.target.name ==='meals'){
      let mealsType = event.target.value;
      dispatch(getMealsType({mealsType}))
      let price = 0;
      let mealData = meals.filter(meal => meal.mealType === mealsType);
      if(selectedMeal ==='No meals'){
        price = mealData.price;
        setSelectedMeal(mealsType);
      }else if(selectedMeal !=='No meals'){
        
        console.log(selectedMeal);
        let removedMealData = meals.filter(meal => meal.mealType === selectedMeal);
        price = -removedMealData.price + mealData.price;
        setSelectedMeal(mealsType);
      }
      
      dispatch(calculateTotalPrice({price}));
    }
    
  }
  
  function handleBooking(){
  
    if(isLoggedIn){
      if(localStorage.getItem('userId')){
        const userId = localStorage.getItem('userId');
      
      const collectionRef = collection(firestore, 'Bookings')
      addDoc(collectionRef,{
        hotelData, 
        roomType: roomType,
        numAdults:numAdults,
        numChild: numChild,
        checkinDate: checkinDate,
        checkoutDate:checkoutDate,
        mealsType: mealsType,
        totalPrice:totalPrice,
        userID: userId,
        status: 'Booked',
        bookingId: hotelData.id
      }).then(()=>{
          
          alert('Successfully booked')
      }).catch((e)=>{
        alert(e.message)
      })
  
      }
    }
    
    isLoggedIn? navigate('/bookings'): dispatch(openLoginModal())
    
  }
  
  return (
    <div className='page'>
      {isLoginOpen&&<Login />}
        {isRegOpen&&<Register />}
      <div className='banner' style={{backgroundImage: `url(${hotelData.imgUrl})`}}></div>

      <div className='Row'>
        <div className='info'>
          <h3>{hotelData.hotelName}</h3>
          <h4>R{hotelData.price}</h4>
          <div>
            <Ratings ratings={hotelData.rating} />
          </div>
          <p>{hotelData.description}</p>
        </div>

        <div className='map-container'>
          <Map location={hotelData.locationUrl} title={hotelData.hotelName} />
        </div>

      </div>

      <div className='filter info'>
        <select className='droplist sec' name='roomtype' onChange={(e)=>handleInput(e)} value={roomType}>
          <option>Single</option>
          <option>Double</option>
        </select>

        <div className='separator'></div>

        <div className='adult'>
          <h5>Adults:</h5>
          <input type='number' onChange={(e)=>handleInput(e)} max={maxAdults} name='adult' placeholder='1' value={numAdults} />
        </div>

        <div className='separator'></div>

        <div className='children'>
          <h5>Children:</h5>
          <input type='number' onChange={(e)=>handleInput(e)} max="4" name='child' placeholder='0' value={numChild} />
        </div>

        <div className='separator'></div>

        <div className='date'>
          <h5>Date:</h5>
          <input type="date" onChange={(e)=>handleInput(e)} name='checkin' min={minDate} value={checkinDate} />
          <FaExchangeAlt className='icon date-icon' />
          <input type="date" name='checkout' onChange={(e)=>handleInput(e)} min={checkinDate} value={checkoutDate} />
        </div>

        <div className='separator'></div>

        <div className='meals'>
          <h5>Meals:</h5>
          <select className='droplist sec' onChange={(e)=>handleInput(e)} name='meals' value={mealsType} >
            <option disabled>No meals</option>
            {meals.map(meal=>{
              return <option key={meal.id}>{meal.mealType}</option>
            })}
          </select>
        </div>

      </div>

      <div className='totPrice'>
        <h4>Total Price: R{totalPrice}</h4>
      </div>

      <div className='bookBtn-container'>
        <button className='btn signup book' onClick={()=>{handleBooking()}}>Book now</button>
      </div>

    </div>
  )
}
