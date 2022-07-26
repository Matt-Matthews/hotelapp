import React from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa'

export default function Ratings(props) {
  return (
    <>
    <div className='stars' hidden={props.ratings !== '1'}>
        <FaStar className='star' />
    </div>
    <div className='stars' hidden={props.ratings !== '1.5'}>
        <FaStar className='star' />
        <FaStarHalf className='star' />
    </div><div className='stars' hidden={props.ratings !== '2'}>
        <FaStar className='star' />
        <FaStar className='star' />
    </div>
    <div className='stars' hidden={props.ratings !== '2.5'}>
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStarHalf className='star' />
    </div> <div className='stars' hidden={props.ratings !== '3'}>
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStar className='star' />
    </div>
    <div className='stars' hidden={props.ratings !== '3.5'}>
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStarHalf className='star' />
    </div><div className='stars' hidden={props.ratings !== '4'}>
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStar className='star' />
    </div>
    <div className='stars' hidden={props.ratings !== '4.5'}>
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStarHalf className='star' />
    </div>
    <div className='stars' hidden={props.ratings !== '5'}>
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStar className='star' />
        <FaStar className='star' />
    </div>
    </>
  )
}
