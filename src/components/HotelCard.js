import React from 'react';
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import 

export default function HotelCard() {
    const imgUrl = "chastity-cortijo-M8iGdeTSOkg-unsplash.jpg";
    const navigate = useNavigate()

    function handleNavigate(){
        navigate('/infopage')
    }
  return (
    <div style={{
        backgroundImage: `url(./images/${imgUrl})`
    }} className='hotelCard'>
        <div className='card-info'>
            <div className='bookbtn-container'>
                <button className='btn' onClick={handleNavigate}>Book now</button>
            </div>
            <div className='hotel-heading'>
                <h3>Hotel name</h3>
                <div className='stars'>
                    <FaStar className='star' />
                    <FaStar className='star' />
                    <FaStarHalf className='star' />
                </div>

            </div>
            <p>R300</p>
        </div>
    </div>
  )
}
