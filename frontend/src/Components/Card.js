import React, { useState, useEffect } from 'react';
import './card.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillLike, AiOutlineDislike } from 'react-icons/ai';
import DOMPurify from 'dompurify';

const Card = ({ item }) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(item.likes);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const isLiked = localStorage.getItem(`isLiked_${item._id}`);
    if (isLiked === 'true') {
      setHasLiked(true);
    }
  }, [item._id]);

  const plainTextContent = DOMPurify.sanitize(item.content, {
    ALLOWED_TAGS: []
  });

  function clickHandler(event) {
    event.preventDefault();
    navigate('/blogpost', { state: item });
  }

  async function likeHandler() {
    if (!hasLiked) {
      try {
        const id = item._id;
        const response = await fetch(`/api/v1/like/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setLike(like + 1);
          setHasLiked(true);
          localStorage.setItem(`isLiked_${id}`, 'true');
        } else {
          throw new Error('Failed to update like');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function dislikeHandler() {
    if (hasLiked) {
      try {
        const id = item._id;
        const response = await fetch(`/api/v1/dislike/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setLike(like - 1);
          setHasLiked(false);
          localStorage.removeItem(`isLiked_${id}`);
        } else {
          throw new Error('Failed to update like');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const words = plainTextContent.split(' ');
  const truncatedContent = words.slice(0, 5).join(' ') + '...';

  return (
    <div className="card">
      <img src={`/${item.photo}`} alt="Lago di Braies"/>

      <div className="card__details">
        <span className="tag" style={{color:"green"}}>{item.categories}</span>
        <div className="name">{item.title}</div>
        <p>{truncatedContent}{' '}<Link onClick={clickHandler}>
          <span style={{color:"blue"}}>Read more</span>
        </Link> </p>
        <span className="tag">Likes:{like}</span>
      </div>

      {hasLiked ? (
        <AiOutlineDislike className="blog-post__like-button" onClick={dislikeHandler} />
      ) : (
        <AiFillLike className="blog-post__like-button" onClick={likeHandler} />
      )}

    </div>
  );
};

export default Card;
