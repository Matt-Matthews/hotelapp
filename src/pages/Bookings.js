import React from 'react'
import BookingCard from '../components/BookingCard';
import './Bookings.css';

export default function Bookings() {

    // eslint-disable-next-line no-unused-vars
    const [index, setIndex]= React.useState(0)

  return (
    <div className='page'>
        <div className='tabController-container'>
        <div className='tabController'>
            <div className={index===0?'tabBtn selected':'tabBtn unselected'} onClick={()=>setIndex(0)}>Recently</div>
            <div className={index===1?'tabBtn selected':'tabBtn unselected'} onClick={()=>setIndex(1)}>Cancelled</div>
            <div className={index===2?'tabBtn selected':'tabBtn unselected'} onClick={()=>setIndex(2)}>Checked out</div>
            <div className={index===3?'tabBtn selected':'tabBtn unselected'} onClick={()=>setIndex(3)}>History</div>
        </div>
        
    </div>
    <div className='tabcontent-container'>
        <div className='content' hidden={index !==0}>
            <div className='bookingCards'>
            <BookingCard />
            <BookingCard />
            <BookingCard />
            </div>
            
        </div>
        <div className='content' hidden={index !==1}>
            <div className='bookingCards'>
            <BookingCard />
            </div>
            </div>
        <div className='content'hidden={index !==2}>
            <div className='bookingCards'>
            No checked out
            </div>
            </div>
        <div className='content'hidden={index !==3}>
            No history
        </div>
    </div>
        
    </div>
  )
}
