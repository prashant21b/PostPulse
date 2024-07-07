import React, { useEffect, useState } from 'react'
import Card from './Card';
import './cards.css'
import Filter from './Filter';
import { Spinner } from './Spinner';
import { baseURL } from '../url';
export const Cards = () => {
const [loading,setLoading]=useState(false);
const [data,setData]=useState([]);
   async function getData(){
        
        const API_URL=`${baseURL}/api/v1/post`
        try {
          setLoading(true);
            const res = await fetch(API_URL);
            
            if (res.ok) {
              const iteams = await res.json();
             
              const sortedData = iteams.data.sort((a, b) => b.likes - a.likes);
              setData(sortedData);
            } else {
              
              setData([]);
            }
          } catch (error) {
            setData([]);
          }
          setLoading(false);
    }
    useEffect(()=>{
        getData();

    },[])
const [category, setCategory] = useState("All");
function getdata() {
  if(category === "All") {
      
      
      return data;
  }
  else {
      //main sirf specific categiry ka data array krunga  
      const filteredData = data.filter(item => item.categories === category);
      return filteredData;       
  }

}
  return (
    <>{
    !loading?(<>
    <h2 style={{textAlign:"center"}}>TOP POSTS</h2>
    <Filter 
          filterData={data}
            category={category}
            setCategory={setCategory}
          />
    <div className='container'>
       
      {
        
     getdata().map((item)=>{
       return <Card className='card' key={item._id} item={item} category={category}/>
     })
        }
    </div>
    </>):(<Spinner style={{margin:"auto 0"
            }}/>)
}
    </>
  )
}
