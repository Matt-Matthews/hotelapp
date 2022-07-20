import React from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa';

export default function BookingCard() {
    const imgUrl = "chastity-cortijo-M8iGdeTSOkg-unsplash.jpg";
  return (
    <div className='bookingCard'>
        
        <div className='hotel-card'>
            <div className='hotel-img' style={{backgroundImage: `url(./images/${imgUrl}`}}>
            </div>
            <div className='hotel-info'>
                <h3>Hotel name</h3>
                <h4>R300</h4>
                <div className='stars'>
                    <FaStar className='star' />
                    <FaStar className='star' />
                    <FaStarHalf className='star' />
                </div>
                <p>Quis magna fugiat id...</p>
                <small>status: booked</small>
            </div>
            
        </div>
        <button>Cancel</button>
    </div>
  )
}
