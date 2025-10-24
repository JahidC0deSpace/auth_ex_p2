import React from 'react'

import ErrorJPG from "../assets/pagenotfound.png";
export const PageNotFound = () => {
  return (
    <div className=' justify-center'>
      <h3  className=' text-center text-2xl font-mono mt-10'>Opps! Nothing To Show</h3>
      <div className='flex justify-center items-center' >
        <img className=' mt-20' src={ErrorJPG} alt="error page" />
      </div>
    </div>
  )
}
