import React from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import ratings from '../backend/ratings';
import { useSelector,useDispatch } from 'react-redux';
import { getEndDate,getHotelsData,getPriceRange,getRatingsRange,getStartDate, setHasData, setIsSearch } from '../features/search/searchSlicer';
import price from '../backend/price';

export default function Filter() {
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const {priceRange,ratingsRange,startDate,endDate,searchedName,hotelsData} = useSelector(state=>state.search);
    var minDate = new Date().toJSON().slice(0,10);
    const {myData,} = useSelector(state=>state.booking);
    function setData(data) {
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
    
   React.useEffect(()=>{
    let length = searchedName.length;
    let filterData = searchedName
            ? myData.filter(hotel=>
                hotel.hotelName.toLowerCase().substr(0,length) === searchedName.toLowerCase())
            : myData;
            let data;
    if(priceRange !== '--Under--'){
        data = filterData.filter(hotel=>hotel.price <= priceRange);       
        setData(data);
    }
    if(ratingsRange!=='--Star--'){
        data = filterData.filter(hotel=>hotel.rating === ratingsRange);       
        setData(data);
    }
    if(priceRange !== '--Under--' && ratingsRange!=='--Star--'){
        data = filterData.filter(hotel=>hotel.price <= priceRange&&hotel.rating === ratingsRange);       
        setData(data);
    }
    // if(priceRange !== '--Under--' && ratingsRange!=='--Star--'){
    //     data = filterData.filter(hotel=>hotel.price <= priceRange&&hotel.rating === ratingsRange&&hotel.checkinDate === startDate&&hotel.checkoutDate===endDate);       
    //     setData(data);
    // }


        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[priceRange,ratingsRange,startDate,endDate,searchedName,myData])

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
            }}
            />
        </div>

    </div>
  )
}
