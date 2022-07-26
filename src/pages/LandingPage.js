import React from 'react';
import { FaSearch, FaArrowDown } from "react-icons/fa";
import Filter from '../components/Filter';
import "./landingPage.css";
import Separator from '../components/Separator';
import HotelCard from '../components/HotelCard';
import Login from '../components/Login';
import Register from '../components/Register';
import {useSelector, useDispatch} from 'react-redux';
import myData from '../backend/data';
import { getHotelsData, getSearchName, setHasData, setIsSearch } from '../features/search/searchSlicer';



export default function LandingPage() {
    const {isLoginOpen,isRegOpen} = useSelector((state) => state.modal);
    const dispatch = useDispatch();


    React.useEffect(()=>{
        let data = myData;
        dispatch(getHotelsData({data}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    // const [isSearch,setIsSearch] = React.useState(false);

    // // eslint-disable-next-line no-unused-vars, no-unused-vars
    const {hotelsData,priceRange,ratingsRange,startDate,endDate,searchedName,hasHotelData,isSearch} = useSelector(state => state.search);

    


    //fix the search function
    function searchAHotel(e){
        

        // console.log('length : '+ length);
        
        if(e.target.value){
        let value = e.target.value;
        let length = value.length;
            let data = myData.filter(hotel=> hotel.hotelName.toLowerCase().substr(0,length) === value.toLowerCase());
            
            
            if(data.length !== 0){
                dispatch(getHotelsData({data}))
                let hasData = true;
                dispatch(setHasData({hasData}))
            }else{
                let hasData = false;
                dispatch(setHasData({hasData}))
            }
            let isInputClicked = true;
             dispatch(setIsSearch({isInputClicked}))
           
        }else{
            let data = myData;

            dispatch(getHotelsData({data}))
            let isInputClicked = false;
             dispatch(setIsSearch({isInputClicked}))
        }
        
    }

    function filterSearch(){
        // console.log('change made');
    }

    React.useEffect(()=>{
        filterSearch();
    },[priceRange,ratingsRange,startDate,endDate])
    
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
                    <input placeholder='search' 
                        onChange={(e)=>{
                            let searchedName = e.target.value;
                            searchAHotel(e);
                            dispatch(getSearchName({searchedName}))
                        }}
                        value={searchedName}
                        />
                    <div className='search-btn' >
                        <FaSearch className='icon' />
                    </div>
                </div>
            </div>
        </div>

        <Filter />
        {!isSearch?
        <>
        <Separator value={'Available'} />
        <div className='cards'>
            {hotelsData.filter(hotel=> hotel.status === 'available').map(data=>{
                return <HotelCard key={data.id} data={data}/>
            })}
            

        </div>
        <div className='prom'>
            <div className='prom-det'>
            <h1><span>Get up to 40% off</span> <span>on meals/rooms.</span> </h1>
            <FaArrowDown className='arrow' />
            </div>
        </div>
        <Separator value={'On sale'} />
        <div className='cards'>
        {hotelsData.filter(hotel=> hotel.status === 'onSale').map(data=>{
                return <HotelCard key={data.id} data={data}/>
            })}
        </div></>:
        hasHotelData?
        <div className='cards'>
        {hotelsData.map(data=>{
            return <HotelCard key={data.id} data={data}/>
        })}
        

    </div>:<div className='cards'>
        <div className='noData'>No data fount!</div>
        
    </div>
        }
    </div>
  )
}
