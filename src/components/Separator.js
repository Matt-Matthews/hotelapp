import React from 'react'

export default function Separator({value}) {
  return (
    <div className='hor-separator'>
        <h4>{value}</h4>
        <div className='hr'></div>
    </div>
  )
}
