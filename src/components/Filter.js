import React from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import ratings from '../backend/ratings';
import { useSelector,useDispatch } from 'react-redux';
import { getEndDate,getHotelsData,getPriceRange,getRatingsRange,getStartDate, setHasData, setIsSearch } from '../features/search/searchSlicer';
import price from '../backend/price';
import myData from '../backend/data';

export default function Filter() {
    const dispatch = useDispatch();
    const {priceRange,ratingsRange,startDate,endDate,searchedName,hotelsData} = useSelector(state=>state.search);
    var minDate = new Date().toJSON().slice(0,10);
    

    
    function filter(e){
        let length = searchedName.length;

        let filterData = searchedName
        ? myData.filter(hotel=>
            hotel.hotelName.toLowerCase().substr(0,length) === searchedName.toLowerCase())
        : myData;
        let data;
        if(e.target.name ==='priceRange' ){
            data = filterData.filter(hotel=>hotel.price <= e.target.value);
                
            if(data.length !== 0){
                dispatch(getHotelsData({data}))
                let hasData= true;
                dispatch(setHasData({hasData}))
            }else{
                let hasData = false;
                dispatch(setHasData({hasData}))
            }
            let isInputClicked = true;
            dispatch(setIsSearch({isInputClicked}))
            
            
        }

        if(e.target.name === 'ratingsRange'){
            data = filterData.filter(hotel=>hotel.rating === e.target.value);
            console.log(data);
            if(data.length !== 0){
                dispatch(getHotelsData({data}))
                let hasData= true;
                dispatch(setHasData({hasData}))
            }else{
                let hasData = false;
                dispatch(setHasData({hasData}))
            }
            let isInputClicked = true;
            dispatch(setIsSearch({isInputClicked}))
        }
        
    }

  return (
    <div className='filter'>
        <h3>Filter by:</h3>

        <div className='separator'></div>

        <div className='price'>
            <h5>Price:</h5>
            <select className='droplist'
                    name='priceRange'
                    value={priceRange}
                    onChange={(e)=>{
                        let priceRange = e.target.value;
                        dispatch(getPriceRange({priceRange}));
                        filter(e)
                        }}  
                    >
                <option disabled>--Under--</option>
                {price.map(each=>{
                    return <option key={each}>{each}</option>
                })}
            </select>
        </div>

        <div className='separator'></div>

        <div className='ratings'>
            <h5>Ratings:</h5>
            <select className='droplist'
                value={ratingsRange}
                onChange={(e)=>{
                    let ratingsRange = e.target.value;
                    dispatch(getRatingsRange({ratingsRange}));
                    filter(e);
                }}
                 name='ratingsRange'>
            <option disabled>--Star--</option>
                {ratings.map(rate=>{
                    return <option key={rate}>{rate}</option>
                })}
            </select>

        </div>

        <div className='separator'></div>

        <div className='date'>
            <h5>Date:</h5>
            <input type="date" 
                min={minDate} 
                value={startDate} 
                name='startDate'
                onChange={(e)=>{
                    let startDate = e.target.value;
                    dispatch(getStartDate({startDate}));
                    filter(e);
                }}
                />
            <FaExchangeAlt className='icon date-icon' />
            <input type="date" 
            min={startDate} 
            value={endDate} 
            name='endDate'
            onChange={(e)=>{
                let endDate = e.target.value;
                dispatch(getEndDate({endDate}));
                filter(e);
            }}
            />
        </div>

    </div>
  )
//   <input className='range' 
// name='priceRange' 
// value={priceRange} 
// onChange={(e)=>{
//     let priceRange = e.target.value;
//     dispatch(getPriceRange({priceRange}));
//     filter(e)
// }}  
// min='0' max='1200'  type='number' />
}
