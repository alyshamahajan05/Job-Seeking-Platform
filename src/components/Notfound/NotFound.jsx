import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='not-found'>
        <div className='content'>
            <img src="/404-status-code.png" alt="notfound" />
            <Link to = {"/"}>RETURN TO HOME</Link>
        </div>  
    </section>
  )
}

export default NotFound
