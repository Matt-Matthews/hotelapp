/* eslint-disable array-callback-return */
import React from 'react';
import Ratings from '../components/Ratings';
import {collection, getDocs,doc,deleteDoc,updateDoc } from 'firebase/firestore';
import {firestore} from '../config/firebase';


export default function BookingCard({data,button,cancelData}) {

  const [docId, setDocId] = React.useState('');

  React.useEffect(()=>{
    const userId = localStorage.getItem('userId');
    const collectionRef = collection(firestore, 'Bookings');
    getDocs(collectionRef).then((snapshot)=>{
      let id;
      snapshot.docs.map(doc=>{
        
        if(doc.data().bookingId === data.bookingId && doc.data().userID === userId){
          return id = doc.id;
        }
        
      })
      setDocId(id)
    })
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function handleClick(){
    let docRef = doc(firestore,'Bookings',docId)
    if(button==='Cancel'){
      cancelData(data.bookingId )
      updateDoc(docRef,{status:"Cancelled"})
    }else if(button === 'Delete'){
      deleteDoc(docRef);
    }

  }

  return (
    <div className='bookingCard'>
        
        <div className='hotel-card'>
            <div className='hotel-img' style={{backgroundImage: `url(${data.hotelData.imgUrl})`}} >
            
            </div>
            <div className='hotel-info'>
                <h3>{data.hotelData.hotelName}</h3>
                <h4>{data.hotelData.price}</h4>
                <div className='stars'>
                <Ratings ratings={data.hotelData.rating} />
                </div>
                <p>{data.hotelData.description.substr(0,20)}...</p>
                <small>status: {data.status}</small>
            </div>
            
        </div>
        <button onClick={handleClick} >{button}</button>
    </div>
  )
}
