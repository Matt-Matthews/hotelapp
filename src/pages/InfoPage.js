import React from 'react';
import { FaStar, FaStarHalf, FaExchangeAlt } from "react-icons/fa";
import './InfoPage.css';
import {useSelector} from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';

export default function InfoPage() {
  const imgUrl = "chastity-cortijo-M8iGdeTSOkg-unsplash.jpg";
  const {isLoginOpen,isRegOpen} = useSelector((state) => state.modal)
  return (
    <div className='page'>
      {isLoginOpen&&<Login />}
        {isRegOpen&&<Register />}
      <div className='banner' style={{backgroundImage: `url(./images/${imgUrl})`}}></div>

      <div className='Row'>
        <div className='info'>
          <h3>Hotel name</h3>
          <h4>R300</h4>
          <div className='stars'>
            <FaStar className='star' />
            <FaStar className='star' />
            <FaStarHalf className='star' />
          </div>
          <p>Quis magna fugiat id adipisicing dolor cillum laboris. 
          Eiusmod et cillum ad eiusmod. Consectetur minim consectetur 
          nostrud proident voluptate aliquip cillum amet nostrud. 
          Dolore anim magna sit eu exercitation sit proident aute 
          commodo ut nostrud ullamco occaecat. Ea ut laborum non 
          aliquip in elit officia.</p>
        </div>

        <div className='map-container'></div>

      </div>

      <div className='filter info'>
        <select className='droplist sec'>
          <option>Single</option>
          <option>Double</option>
        </select>

        <div className='separator'></div>

        <div className='adult'>
          <h5>Adults:</h5>
          <input type='number' placeholder='1' />
        </div>

        <div className='separator'></div>

        <div className='children'>
          <h5>Children:</h5>
          <input type='number' placeholder='0' />
        </div>

        <div className='separator'></div>

        <div className='date'>
          <h5>Date:</h5>
          <input type="date" />
          <FaExchangeAlt className='icon date-icon' />
          <input type="date" />
        </div>

        <div className='separator'></div>

        <div className='meals'>
          <h5>Meals:</h5>
          <select className='droplist sec'>
            <option>All</option>
            <option>Breakfast</option>
          </select>
        </div>

      </div>

      <div className='totPrice'>
        <h4>Total Price: R300</h4>
      </div>

      <div className='bookBtn-container'>
        <button className='btn signup book'>Book now</button>
      </div>

    </div>
  )
}
