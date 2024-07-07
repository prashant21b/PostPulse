import React, { useEffect, useState } from 'react'
import Blog from '../Components/Blog';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
// import './blogs.css'
import '../Components/cards.css'
import { baseURL } from '../url';
export const Blogs = () => {
const [loading,setLoading]=useState(false);
const [data,setData]=useState([]);
   async function getData(){
    const token = localStorage.getItem('jwtToken');
  const decodedToken = token ? jwtDecode(token) : null;
  const userId=decodedToken.id;
        const API_URL=`${baseURL}/api/v1/userpost/${userId}`
        try {
            const res = await fetch(API_URL);
            console.log("re->>",res)
            if (res.ok) {
              const iteams = await res.json();
              console.log("product data", iteams.data);
              setData(iteams.data);
            } else {
              console.error("Error: " + res.status);
              setData([]);
            }
          } catch (error) {
            console.error("Error:", error);
            setData([]);
          }
          setLoading(false);
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <>
    {
      data.length>0?(
        <>

    <h2 style={{textAlign:"center",marginTop:"50px"}} >MY BLOGS</h2>
    <div className='container'>
        
      {
        
     data.map((item)=>{
       return <Blog className='card'  key={item._id} item={item}/>
     })
        }
    </div>
    </>
      ):(<div className='msg'>
          <h4>No Blog Found....</h4>
          <Link className='button' to='/create'>Create Now</Link>
      </div>)
    }
    </>
  )
}
