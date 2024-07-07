import React, { useState, useEffect } from 'react';
import './card.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillLike, AiOutlineDislike } from 'react-icons/ai';
import DOMPurify from 'dompurify';
import { baseURL } from '../url';
import axios from 'axios';

const Card = ({ item }) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(item.likes.length);
  const [hasLiked, setHasLiked] = useState(false);
  const token = localStorage.getItem('jwtToken');
  const userId =token && JSON.parse(atob(token?.split('.')[1])).id; // Extract user ID from JWT token

  useEffect(() => {
    const userHasLiked = item.likes.includes(userId);
    setHasLiked(userHasLiked);
  }, [item.likes, userId]);

  const sanitizedContent = DOMPurify.sanitize(item.content);
  const plainTextContent = sanitizedContent.replace(/<[^>]+>/g, '');
  const words = plainTextContent.split(' ');
  const truncatedContent = words.slice(0, 5).join(' ') + '...';

  function clickHandler(event) {
    event.preventDefault();
    navigate('/blogpost', { state: item });
  }

  async function likeHandler() {
    try {
      const id = item._id;
      const response = await axios.post(`${baseURL}/api/v1/like/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedPost = response.data.post;
        setLike(updatedPost.likes.length);
        setHasLiked(updatedPost.likes.includes(userId));
      } else {
        throw new Error('Failed to update like');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card">
      <img src={item.photo.url} alt="Blog Post" />

      <div className="card__details">
        <span className="tag" style={{ color: "green" }}>{item.categories}</span>
        <div className="name">{item.title}</div>
        <p>{truncatedContent}{' '}<Link onClick={clickHandler}>
          <span style={{ color: "blue" }}>Read more</span>
        </Link></p>
        <span className="tag">Likes: {like}</span>
      </div>

      {hasLiked ? (
        <AiOutlineDislike className="blog-post__like-button" onClick={likeHandler} />
      ) : (
        <AiFillLike className="blog-post__like-button" onClick={likeHandler} />
      )}
    </div>
  );
};

export default Card;
