import React from 'react';
import { useNavigate } from 'react-router-dom';
import Ratings from './Ratings';
// import {useDispatch, useSelector} from 'react-redux';

export default function HotelCard({data}) {
    // const imgUrl = "chastity-cortijo-M8iGdeTSOkg-unsplash.jpg";
    const navigate = useNavigate()
   
    

    function handleNavigate(id){
        navigate(`/infopage/${id}`)
    }
    
  return (
    <div style={{
        backgroundImage: `url(${data.imgUrl})`
    }} className='hotelCard'>
        <div className='card-info'>
            <div className='bookbtn-container'>
                <button className='btn' onClick={()=>handleNavigate(data.id)}>Book now</button>
            </div>
            <div className='hotel-heading'>
                <h3>{data.hotelName}</h3>
                <div className='rating-stars'>
                    <Ratings ratings={data.rating} />
                </div>

            </div>
            <p>R{data.price}</p>
        </div>
    </div>
  )
}
