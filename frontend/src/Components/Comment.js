import React from 'react'

export const Comment = ({item}) => {
    const timestamp = new Date(item.createdAt);
const year = timestamp.getFullYear().toString().slice(2);
const month = ('0' + (timestamp.getMonth() + 1)).slice(-2);
const day = ('0' + timestamp.getDate()).slice(-2);
const date=year+'-'+month+'-'+day
  return (
    <div className='comment'>

     <h3>{item.user.username}</h3>
     <p>{date}</p>
     <p style={{font:"bold"}}>{item.comment}</p>
    </div>
  )
}
