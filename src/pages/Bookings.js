import React from 'react'
import BookingCard from '../components/BookingCard';
import './Bookings.css';
import { setBookingsData } from '../features/booking/bookingSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../features/modal/modalSlice';
import Login from '../components/Login';
import Register from '../components/Register';


export default function Bookings() {

    const dispatch = useDispatch();
    const {bookingsData} = useSelector(state=>state.booking)
    
    // eslint-disable-next-line no-unused-vars
    const [index, setIndex]= React.useState(0);
    React.useEffect(()=>{
        dispatch(setBookingsData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const [bookedData,setBookedData]=React.useState([]);
    const [bookingHistory,setBookingHistory] = React.useState([]);
    const [cancelledBooking,setCancelledBooking] = React.useState([]);
    const [checkedOut,setCheckedOut] = React.useState([]);
    React.useEffect(()=>{
        const userId = localStorage.getItem('userId');
        let tempData = bookingsData.filter(bookingData=>bookingData.userID === userId&&bookingData.status==='Booked')
        setBookedData(tempData)
        let tempBookinData = bookingsData.filter(bookingData=>bookingData.userID === userId)
        setBookingHistory(tempBookinData)
        
        setCancelledBooking(bookingsData.filter(bookingData=>bookingData.userID === userId&&bookingData.status==='Cancelled'))
        setCheckedOut(bookingsData.filter(bookingData=>bookingData.userID === userId&&bookingData.status==='Checked out'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[bookingsData])

    React.useEffect(()=>{

        if(!localStorage.getItem('isLoggedIn')){
            localStorage.setItem('isLoggedIn','false');
        }else if(localStorage.getItem('isLoggedIn') === 'true'){
            let isLoggedIn = true;
            dispatch(setLoggedIn({isLoggedIn}))
        }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    function cancelData(id){
        console.log(id);
        setCancelledBooking(prev=>{
            return prev.filter(prevData=>prevData.bookingId !== id)
        })
    }
    const {isLoginOpen,isRegOpen} = useSelector((state) => state.modal);
  return (
    <div className='page'>
        {isLoginOpen&&<Login />}
        {isRegOpen&&<Register />}
        <div className='tabController-container'>
        <div className='tabController'>
            <div className={index===0?'tabBtn selected':'tabBtn unselected'} onClick={()=>setIndex(0)}>Recently</div>
            <div className={index===1?'tabBtn selected':'tabBtn unselected'} onClick={()=>setIndex(1)}>Cancelled</div>
            <div className={index===2?'tabBtn selected':'tabBtn unselected'} onClick={()=>setIndex(2)}>Checked out</div>
            <div className={index===3?'tabBtn selected':'tabBtn unselected'} onClick={()=>setIndex(3)}>History</div>
        </div>
        
    </div>
    <div className='tabcontent-container'>
        <div className='content' hidden={index !==0}>
            <div className='bookingCards'>
            {bookedData.length !== 0?bookedData.map(bookingData=>{
            return <BookingCard key={bookingData.hotelData.id} data={bookingData} cancelData={cancelData} button='Cancel' />
            }):'No bookings found'}
            
            </div>
            
        </div>
        <div className='content' hidden={index !==1}>
            <div className='bookingCards'>
            {
                cancelledBooking.length !== 0?cancelledBooking.map(bookingData=>{
                    return <BookingCard key={bookingData.hotelData.id}  data={bookingData}  button='Delete' />
                    }):'No bookings cancelled'
            }
            </div>
            </div>
        <div className='content'hidden={index !==2}>
            <div className='bookingCards'>
            {
                checkedOut.length !== 0?checkedOut.map(bookingData=>{
                    return <BookingCard key={bookingData.hotelData.id}  data={bookingData} button='Delete' />
                    }):'No bookings checked out'
            }
            </div>
            </div>
        <div className='content'hidden={index !==3}>
        <div className='bookingCards'>
        {bookingHistory.length !== 0?bookingHistory.map(bookingData=>{
            return <BookingCard key={bookingData.hotelData.id} data={bookingData}  button={bookingData.status==='Booked'?'Cancel':'Delete'} />
            }): 'No history'}
            </div>
        </div>
    </div>
        
    </div>
  )
}
