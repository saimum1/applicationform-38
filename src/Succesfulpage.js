import React from 'react'
import { Link } from 'react-router-dom'
import './sc.css'
const Succesfulpage = () => {

  return (
    <div className='scdiv'>
        <h1 >Successfully applied</h1>
        <Link to='/'  className='lnk'>return to application page</Link>
    </div>
  )
}

export default Succesfulpage