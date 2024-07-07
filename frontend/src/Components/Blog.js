import React, { useState } from 'react';
import './blog.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import { LiaEditSolid } from 'react-icons/lia';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { baseURL } from '../url';
const Blog = ({ item, deleteItem }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDeleted, setIsDeleted] = useState(false);
  const plainTextContent= DOMPurify.sanitize(item.content, {
    ALLOWED_TAGS: []
  });
  function clickHandler(event) {
    event.preventDefault();
    navigate('/blogpost', { state: item });
  }
  function editHandler(event) {
    event.preventDefault();
    navigate('/editblog', { state: item });
  }
  async function deleteHandler() {
    try {
      const id = item._id;
      const response = await fetch(`${baseURL}/api/v1/delete/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status) {

        toast.success('Deleted Successfully');
        setIsDeleted(true);
      } else {
        
        throw new Error('Failed to delete');
      }
    } catch (error) {
      
      console.error(error);
    }
  }


  const words = item.content.split(' ');

  
  const truncatedContent = words.slice(0, 5).join(' ') + '...';

  if (isDeleted) {
    return null; 
  }

  return (
    <div className="blog-post">
      <img className="blog-post__image" src={item.photo.url} alt="Blog Post" />
      <h5 className="blog-post__title">{item.title}</h5>
      <p className="blog-post__content">
       
        <Link onClick={clickHandler}>
          <span>Read more</span>
        </Link>
      </p>

      <p className="blog-post__category" style={{ color: 'green' }}>
        {item.categories}
      </p>

      <p className="blog-post__likes">Likes: {item.likes}</p>
      <div >
        <LiaEditSolid className="blog-post__like-button"  onClick={editHandler}></LiaEditSolid>
        <MdDelete className="blog-post__like-button" onClick={deleteHandler}></MdDelete>
      </div>
    </div>
  );
};

export default Blog;
