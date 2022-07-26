import React from 'react'

export default function Map({location, hotelName}) {
  return (
    <div><iframe className='map' src={location} style={{border:0}} title={hotelName} /></div>
  )
}
