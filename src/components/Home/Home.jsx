import React, { useContext } from 'react'
import {Context} from '../../main'
import { Navigate } from 'react-router-dom';
import HeroSection from './HeroSection'
import HowItWorks from './HowItWorks'
import PopularCompanies from './PopularCompanies'
import PopularCategories from './popularCategories'

const Home = () => {
  const {isAuthorised} = useContext(Context);
  if(!isAuthorised){
    return <Navigate to={'/login'}/>
  }

  return (
    <section className='homePage page'>
      <HeroSection/>
      <HowItWorks/>
      <PopularCompanies/>
      <PopularCategories/>
      
    </section>
  )
}

export default Home
