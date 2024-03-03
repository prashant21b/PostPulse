// CreateBlogPost.js

import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import './createBlog.css'
import jwtDecode from 'jwt-decode';
import axios from 'axios'
import ReactQuill from 'react-quill';
const CreateBlogs= () => {
 
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState('');
  const [image,setImage]=useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('jwtToken')) {
      navigate('/');
    }
  }, []);

  const token = localStorage.getItem('jwtToken');
  const decodedToken = token ? jwtDecode(token) : null;

  // const submitHandler= async (event) => {
  //   console.log(image);
  //   event.preventDefault();
  //   const response = await fetch('http://localhost:4000/api/v1/create', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       title:title,
  //       categories:categories,
  //       content:content,
  //       photo:photo,
  //       author:decodedToken.id
        
  //     }),
  //   });
  //   navigate('/blogs');
  // };
  const clickHandler =async  (event) => {
    event.preventDefault();
    console.log(title,categories,content,image,45);


    const formData = new FormData()
    formData.append('title', title)
    formData.append('categories',categories)
    formData.append('content', content)
    formData.append('image', image)
    formData.append('author',decodedToken.id)
    console.log("-->",formData.get('image'))
   await   axios.post('/api/v1/create',
        formData,
        {
            headers: { 
              
            }
        }
    )
    navigate('/blogs');
}

  return (
    <div className='form-ctn'>
      <h2 style={{textAlign:"center",marginTop:"50px"}}>Create a Blog Post</h2>
      <div className='form'>
      <form  className="frm"onSubmit={clickHandler} enctype="multipart/form-data">
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Categories:</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          {/* <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea> */}
          {/* <ReactQuill theme="snow" value={content} onChange={(e) => setContent(e.target.value)} /> */}
          <div style={{ height: '200px', overflowY: 'scroll' ,backgroundColor:"white"}}>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
      />
    </div>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
          {/* <input type='text' value={photo} onChange={(e)=>setPhoto(e.target.value)}/> */}
        </div>
        <button  type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default CreateBlogs;
