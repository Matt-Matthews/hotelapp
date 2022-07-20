import React from 'react';
import { FaSearch, FaArrowDown } from "react-icons/fa";
import Filter from '../components/Filter';
import "./landingPage.css";
import Separator from '../components/Separator';
import HotelCard from '../components/HotelCard';
import Login from '../components/Login';
import Register from '../components/Register';
import {useSelector} from 'react-redux';



export default function LandingPage() {
    const {isLoginOpen,isRegOpen} = useSelector((state) => state.modal)
   
  return (
    <div >
        {isLoginOpen&&<Login />}
        {isRegOpen&&<Register />}
        <div className='banner'>
            <div className='text-container'>
                <h2>
                Experience <span>of a</span><span>life time.</span>  
                </h2>
            </div>
            <div className='search-container'>
                <div className='search-input'>
                    <input placeholder='search' />
                    <div className='search-btn'>
                        <FaSearch className='icon' />
                    </div>
                </div>
            </div>
        </div>

        <Filter />
        <Separator value={'Available'} />
        <div className='cards'>
            <HotelCard />
            <HotelCard />
            <HotelCard />
            <HotelCard />
        </div>
        <div className='prom'>
            <div className='prom-det'>
            <h1><span>Get up to 40% off</span> <span>on meals/rooms.</span> </h1>
            <FaArrowDown className='arrow' />
            </div>
        </div>
        <Separator value={'On sale'} />
        <div className='cards'>
            <HotelCard />
            <HotelCard />
            <HotelCard />
            <HotelCard />
        </div>
    </div>
  )
}
