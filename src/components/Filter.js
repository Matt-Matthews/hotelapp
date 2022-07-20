import React from 'react';
import { FaExchangeAlt } from "react-icons/fa";

export default function Filter() {

  return (
    <div className='filter'>
        <h3>Filter by:</h3>

        <div className='separator'></div>

        <div className='price'>
            <h5>Price:</h5>
            <p>R0</p>
            <input className='range' type='range' />
            <p>R1200</p>
        </div>

        <div className='separator'></div>

        <div className='ratings'>
            <h5>Ratings:</h5>
            <select className='droplist'>
                <option>abc</option>
                <option>def</option>
            </select>

        </div>

        <div className='separator'></div>

        <div className='date'>
            <h5>Date:</h5>
            <input type="date" />
            <FaExchangeAlt className='icon date-icon' />
            <input type="date" />
        </div>

    </div>
  )
}
