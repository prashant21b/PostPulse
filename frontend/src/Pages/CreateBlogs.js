import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './createBlog.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { baseURL } from '../url';

const CreateBlogs = () => {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // Updated to handle file input
  const [imageUrl, setImageUrl] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('jwtToken')) {
      navigate('/');
    }
  }, []);

  const token = localStorage.getItem('jwtToken');
  const decodedToken = token ? jwtDecode(token) : null;
   console.log("27",title,content,imageUrl,publicKey)
   const clickHandler = async (event) => {
    event.preventDefault();
  
    if (!imageUrl || !publicKey) {
      console.error("Image not uploaded properly");
      return;
    }
  
    // const formData = new FormData();
    // formData.append('title', title);
    // formData.append('categories', categories);
    // formData.append('content', content);
    // formData.append('photo', imageUrl); // Using image URL from the response
    // formData.append('author', decodedToken.id);
    // formData.append('public_key', publicKey); // Using public key from the response
  
    // // Log FormData content
    // for (let pair of formData.entries()) {
    //   console.log(pair[0]+ ': ' + pair[1]); 
    // }
  
    try {
    await axios.post(`${baseURL}/api/v1/create`,{
      title,
      categories,
      content,
      author:decodedToken.id,
      photoUrl:imageUrl,
       photoPublicId:publicKey
    });
      navigate('/blogs');
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };
  
  const ImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (!file) {
      console.error("No file selected");
      return;
    }
    setImage(file);
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${baseURL}/api/v1/upload-image`, formData);
      console.log(response)
      setImageUrl(response.data.url);
      setPublicKey(response.data.public_id);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  return (
    <div className='form-ctn'>
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>Create a Blog Post</h2>
      <div className='form'>
        <form className="frm" onSubmit={clickHandler} encType="multipart/form-data">
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
            <div style={{ height: '200px', overflowY: 'scroll', backgroundColor: "white" }}>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </div>
          <div>
            <label>Image:</label>
            <input type="file" name="image" onChange={ImageUpload} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogs;
