import React from 'react'
import './card.css'
import { useNavigate } from 'react-router-dom';
export const RecentPost = ({item}) => {
const timestamp = new Date(item.createdAt);
const year = timestamp.getFullYear().toString().slice(2);
const month = ('0' + (timestamp.getMonth() + 1)).slice(-2);
const day = ('0' + timestamp.getDate()).slice(-2);
const authorobj=item.author;
const author=authorobj.username;
const yyMMdd = year + '-' + month + '-' + day;
const navigate=useNavigate();
function clickHandler(event) {
    event.preventDefault();
    navigate('/blogpost', { state: item });
  }
  return (
   
        <div className="card">
      <img src={item.photo.url} alt="Lago di Braies"/>
      <div className="card__details">
        <div className="name title" onClick={clickHandler}>{item.title}</div>
         <span className="tag">{yyMMdd}</span>
      </div>
    </div>
  )
}
