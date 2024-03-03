import React, { useState,useEffect } from 'react'
import Header from '../Components/Header'
import { Cards } from '../Components/Cards'
import { RecentPosts } from './RecentPosts'
import './home.css'
export const Home = () => {
  return (
    <div className='home'>
   <div className='left'><Cards/></div>
   <div className='right'><RecentPosts/></div>
   </div>

  )
}
